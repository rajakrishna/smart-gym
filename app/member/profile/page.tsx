'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import MemberDetailsSection from '@/components/member/MemberProfileCard'

export default function MemberProfilePage() {
  return (
    <div className="container px-4">
      <div className="flex flex-col items-center justify-center gap-2 my-10">
        <Avatar className="w-16 h-16">
          <AvatarImage src="" alt="user avatar" />
          <AvatarFallback className="flex items-center justify-center bg-gray-200 rounded-full w-full h-full">
            <User className="w-8 h-8 text-gray-500" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold mt-1">User Profile</p>
      </div>
      <div className='p-6'>
        <MemberDetailsSection/>  
      </div>
      
    </div>
  )
}
