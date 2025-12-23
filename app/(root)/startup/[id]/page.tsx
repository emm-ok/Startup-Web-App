import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import MarkdownIt from 'markdown-it'
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = MarkdownIt();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    // console.log("Author", post?.author)
    if(!post) return notFound();

    const parsedContent = md.render(post?.pitch || '');


  return <>
  <section className="pink_container flex flex-col justify-center !min-h-[230px]">
    <p className="tag text-center p-4 font-bold text-2xl bg-orange-500">{formatDate(post?._createdAt)}</p>
    <h1 className="heading text-white p-8 bg-black text-center text-3xl font-extrabold">{post.title}</h1>
    <p className="sub-heading max-w-5xl">{post.description}</p>
  </section>
  <section className="section_container">
    <img src={post?.image} alt="thumbnail" className="w-full h-auto rounded-xl" />
    <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex justify-between gap-5">
            <Link 
                href={`user/${post.author?._id}`} 
                className="flex gap-2 items-center mb-3">
                    <Image src={post.author?.image} alt="avatar" width={40} height={40} className='rounded-full w-20 h-20'/>

                    <div className="text-2xl font-medium">{post.author?.name}</div>
                    <div className="font-medium text-black">@{post.author?.username}</div>
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

    <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
    </Suspense>

  </section>
  </>;
};

export default page;
