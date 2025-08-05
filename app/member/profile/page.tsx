'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import MemberProfileCard from '@/components/layouts/member/memberProfile'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'
import type { ComponentType } from 'react'

const labels = LABELS.pages.member_profile
const icons = ICONS.memberProfile

type MemberProfileItem = {
  label: string
  icon: ComponentType<{ className?: string }>
}

const memberProfileKeys = [
  'memberDetails',
  'paymentMethod',
  'checkinHistory',
  'classHistory',
] as const

const memberProfileItems: MemberProfileItem[] = memberProfileKeys.map((key) => ({
  label: labels.menu[key],
  icon: icons[key],
}))

export default function MemberProfilePage() {
  return (
    <div className="container px-4">
        <div className="flex flex-col items-center justify-center gap-2 my-10">
            <Avatar className="w-16 h-16">
                <AvatarImage src="" alt="user avatar" />
                <AvatarFallback className="flex items-center justify-center">
                    <ICONS.memberProfile.userIcon className="w-8 h-8" />
                </AvatarFallback>
            </Avatar>
        <p className="text-sm font-semibold mt-1">John</p>
        </div>

        <MemberProfileCard items={memberProfileItems} />
    </div>
  )
}
