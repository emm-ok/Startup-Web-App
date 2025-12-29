"use server";

import { writeClient } from "@/sanity/lib/write";
import { auth } from "./auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { toast } from "sonner";

export const createPitch = async (
  state: { error?: string; status?: string },
  form: FormData
) => {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link, pitch } =
    Object.fromEntries(form);

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    toast.error(error instanceof Error ? error.message : JSON.stringify(error));

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};


export async function deleteStartup(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Uanuthorized");
  }

  const startup = await writeClient.fetch(
    `*[_type == 'startup' && _id == $id][0]{
            _id,
            author-> { _id, id },
        }`,
    { id }
  );

  if (!startup) {
    throw new Error("Startup not found");
  }

  const authorId = startup.author?.id || startup.author?._id;

  if(authorId == session.user.id) {
    throw new Error('Forbidden: You are not the owner');
  }

  if (!id) throw new Error("Missing startup ID");

  await writeClient
  .patch(id)
  .set({ isDeleted: true })
  .commit();
  
}
