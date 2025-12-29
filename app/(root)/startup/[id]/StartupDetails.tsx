import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import MarkdownIt from 'markdown-it'
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = MarkdownIt();

const page = async ({ id }: { id: string }) => {
  const [post, {select: editorPost}] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY , { slug: 'editor-picks'})
  ]);

    if(!post) return notFound();

    const parsedContent = md.render(String(post?.pitch ?? ''));

  return <>
  <section className="pink_container flex flex-col justify-center m-10 !min-h-[230px]">
    <p className="tag text-center p-4 font-bold text-2xl">{formatDate(post?._createdAt)}</p>
    <h1 className="heading text-white p-8 bg-black text-center text-3xl font-extrabold rounded-xl mb-10">{post.title}</h1>
    <p className="sub-heading max-w-5xl">{post.description}</p>
  </section>
  <section className="section_container relative m-10">
    <Image src={post?.image} alt="thumbnail" width={800} height={400} className="w-full h-auto rounded-xl" />
    <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex justify-between gap-5">
            <Link 
                href={`user/${post.author?._id}`} 
                className="flex gap-2 items-center mb-3">
                    <Image src={post.author?.image} alt="avatar" width={40} height={40} className='rounded-full w-20 h-20'/>

                    <div className="flex flex-col">
                      <div className="text-2xl font-medium">{post.author?.name}</div>
                      <div className="font-medium text-black">@{post.author?.username}</div>
                    </div>
            </Link>

            <p className='category-tag'>{post.category}</p>
        </div>

        <h3 className="text-2xl font-bold">Pitch Details</h3>
        {parsedContent ? (
            <article 
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }} />
        ): (
            <p className="no-result">No pitch details available</p>
        )}

    </div>

    <hr className="divider" />

    {editorPost?.length > 0 && (
      <div className="max-w-4xl mx-auto mt-5">
        <p className="text-2xl font-semibold">Editor Picks</p>

        <ul className='mt-7 card_grid-sm grid sm:grid-cols-2 gap-5'>
          {editorPost.map((post: StartupTypeCard, i: number) => (
            <StartupCard key={i} post={post} />
          ))}
        </ul>
      </div>
    )}

  </section>
  </>;
};

export default page;
