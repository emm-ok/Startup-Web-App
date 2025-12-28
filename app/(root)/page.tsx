import SearchForm from '@/components/SearchForm'
import StartupCard, { StartupTypeCard } from '@/components/StartupCard'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { STARTUPS_QUERY } from '@/sanity/lib/queries'
import React from 'react'

const Home = async ({ searchParams }: {
  searchParams: Promise<{ query?: string}>
}) => {

  const query = (await searchParams).query;

  const params = { search: query || null};

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });


  return (
    <>
      <section className=' p-4 text-xl flex flex-col justify-center items-center gap-4'>
        <h1 className='p-8 rounded-md font-bold text-3xl text-center bg-black text-white'>Pitch Your Startup, <br /> Connect With Entrepreneurs</h1>
  
        <p>Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
  
        <SearchForm query={query} />
      </section>
  
      <section className='pink_container m-auto p-4'>
        <p className='font-bold text-2xl'>
          {query ? `Search results for "${query}"` : `All Startups`}
        </p>

        <ul className='mt-7 card_grid grid md:grid-cols-3 sm:grid-cols-2 gap-5'>
          {posts?.length > 0 ? (
            posts?.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post} />
            ))
          ): (
            <p className='no-results text-2xl font-bold'>No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  )
}

export default Home