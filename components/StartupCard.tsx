import { Author, Startup } from '@/sanity/types'
import { formatDate } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaEye } from 'react-icons/fa6'

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard}) => {
  const { 
    _createdAt, 
    views, 
    author, 
    title, 
    category, 
    _id, 
    image, 
    description 
  } = post
  return (
    <li className='startup-card group border rounded-xl p-4 hover:border-red-800 hover:bg-gray-200'>
      <div className='flex items-center justify-between'>
        <p className=''>
          {formatDate(_createdAt)}
        </p>
        <div className='flex gap-1.5 items-center'>
          <FaEye style={{ color: 'darkred'}}/>
          <span className='font-medium'>{views}</span>
        </div>
      </div>

      <div className='flex justify-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${author?._id}`}>
            <p className='text-[16px] font-medium line-clamp-1'>{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='text-[26px] font-semibold'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image 
            src={author?.image || '/default-avatar.png'} 
            alt='placeholder' 
            width={48} 
            height={48} 
            className='rounded-full w-14 h-14 border-2' />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className='startup-card'>
          {description}
        </p>

        <img  
          src={image} 
          alt='placeholder' 
          className='startup-card_img w-full h-75 object-cover rounded-xl mt-5'/>
      </Link>

      <div className='flex justify-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-[16px] font-medium'>{category}</p>
        </Link>
        <button className='startup-card_btn text-white bg-black rounded-full px-4 py-2 font-medium'>
          <Link href={`/startup/${_id}`}>
            Details
          </Link>
        </button>
      </div>
    </li>
  )
}
 
export default StartupCard