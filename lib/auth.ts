import { getServerSession } from "next-auth/next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Account, Profile, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      return session;
    },
    async signIn({ user, account, profile }: { user: User | any; account: Account | null; profile?: Profile }) {
      const githubProfile = profile as any; // GitHub profile type
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubProfile?.id });
      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id: githubProfile?.id,
          name: user.name,
          username: githubProfile?.login,
          email: user.email,
          image: user.image,
          bio: githubProfile?.bio || '',
        });
      }
      return true;
    },
    async jwt({ token, account, profile }: { token: JWT; account?: Account | null; profile?: Profile }) {
      if (account && profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: (profile as any)?.id });
        token.id = user._id;
      }
      return token;
    },
  },
};

export const auth = async () => await getServerSession(authOptions);