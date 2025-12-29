import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartups from '@/components/UserStartups';
import { auth } from '@/lib/auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { Suspense } from 'react';

const Page = async ({ params }: {params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

    if(!user) return notFound();
    return (
    <>
        <section className="profile_container grid grid-cols-1 md:grid-cols-2 gap-5 m-10">
            <div className='profile_card shadow-lg h-[500px] rounded border-2 flex flex-col justify-center items-center gap-4 p-10'>
                <div className='profile_title'>
                    <h3 className='text-md md:text-xl font-medium md:font-bold text-white bg-black rounded-full p-4 uppercase text-center'>
                        {user.name}
                    </h3>
                </div>

                <Image 
                    src={user.image} 
                    alt={user.name}
                    width={180}
                    height={180}
                    className='profile_image rounded-full border-4 border-black'
                />

                <p className='text-2xl font-extrabold mt-7 text-center'>@{user.username}</p>
                <p className='m-1 text-center text-2xl'>{user.bio}</p>
                
            </div>

            <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
                <p className='text-2xl font-bold'>
                    {session?.user?.id === id ? "Your" : "All"} Startups
                </p>
                <ul className='card_grid-sm'>
                    <Suspense fallback={<StartupCardSkeleton />}>
                        <UserStartups id={id} />
                    </Suspense>
                </ul>
            </div>
        </section>
    </>
  )
}

export default Page