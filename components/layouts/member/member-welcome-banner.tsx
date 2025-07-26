'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BellDot, ScanBarcode } from 'lucide-react'
import LABELS from '@/constants/labels'
import { useUser } from '@/context/user-context'

const {firstName, imageURL, greeting, profileHref} = LABELS.memberDash

const MemberWelcome = () => {
  const user = useUser()
  console.log('UserContext:', user)
  if (!user) return null
  return (
          <div className="px-5">
            <div className="flex flex-row items-center justify-between mt-5">
              <div className="flex flex-row">
                <Link href={profileHref}>
                <Image
                  src={imageURL}
                  alt=''
                  width={100}
                  height={100}
                  className="size-15 rounded-full"
                  />
                  </Link>
                <div className="flex flex-col items-start ml-2 justify-center">
                  <p className="text-sm tracking-tighter">
                    {greeting}
                  </p>
                  <p className="text-lg tracking-widest">
                    {user.first_name}
                  </p>
                </div>
              </div>
              <div className='flex gap-6 items-center'>
              <ScanBarcode size="30"/><BellDot size="25"/>
              </div>
            </div>
        </div>

  )
}

export default MemberWelcome