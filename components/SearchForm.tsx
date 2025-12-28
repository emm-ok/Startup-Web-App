import React from 'react'
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { FaSearch } from 'react-icons/fa'

const SearchForm = ({ query }: { query?: string}) => {

  return (
    <Form action='/' scroll={false} className='search-form flex border-4 border-black rounded-xl p-2'>
        <input 
            type="text" 
            name='query'
            defaultValue={query}
            value={query}
            className='search-input rounded-xl px-4 py-2 outline-none text-lg'
            placeholder="Search startups" />

            <div className='flex gap-2'>
                {query && <SearchFormReset />}

                <button type='submit' className='search-btn flex justify-center items-center bg-black w-[45px] h-[45px] cursor-pointer p-2 rounded-full text-white text-lg'>
                    <FaSearch />
                </button>
            </div>
    </Form>
  )
}

export default SearchForm