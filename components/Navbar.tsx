'use client'

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const { data: session } =  useSession();

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if(parts.length === 0) return "";
    if(parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  const initials = getInitials(session?.user?.name ?? "");

  return (
    <div className='px-5 py-3 bg-white shadow-sm font-work-sans font-medium  text-black'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          {/* <Image src='logo.png' alt='logo' width={144} height={30}/> */}
          Yc-Directory
        </Link>

        <div className='flex items-center gap-5'>
          {session && session?.user ? (
            <>
              <Link href='/startup/create'>
                <span>Create</span>
              </Link>

              <button className='cursor-pointer' onClick={() => signOut()}>
                <span>
                  Logout
                </span>
              </button>

              <Link href={`/user/${session?.user?.id}`} className='rounded-full p-2 shadow-md '>
                <span className='text-2xl'>{initials}</span>
              </Link>
            </>
          ): (
            <button className='cursor-pointer' onClick={() => signIn('github')}>
              <span>Login</span>
            </button>
          )
        }
        </div>
      </nav>
    </div>
  )
}

export default Navbar