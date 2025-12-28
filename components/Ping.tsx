import React from 'react'

const Ping = () => {
  return (
    <div className='relative'>
      <div className='absolute -left-4 top-1'>
        <span className='flex size-[15px]'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500'></span>
          <span className='absolute inline-flex h-full w-full rounded-full bg-red-500'></span>
        </span>
      </div>
    </div>
  )
}

export default Ping