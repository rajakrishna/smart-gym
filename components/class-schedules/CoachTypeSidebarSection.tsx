'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Coach } from '@/types/shared'
import { getClassColors } from '@/lib/classScheduleUtils'
import { getInitialsForAvatars } from '@/lib/utils'

interface CoachItemProps {
  coach: Coach
}

interface CoachTypeSectionProps {
  coaches: Coach[]
  classType: string
}

const CoachItem: React.FC<CoachItemProps> = ({ coach }) => {
  const fullName = `${coach.first_name ?? 'Unknown'} ${coach.last_name ?? ''}`.trim()
  return (
    <div className="coach-item p-3 flex gap-3 items-center rounded-md border border-gray-200 bg-white">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={coach.profile_picture || `https://ui-avatars.com/api/?name=${fullName}`}
        />
        <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
          {getInitialsForAvatars(fullName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <span className='font-medium text-gray-800 text-sm'>{fullName}</span>
      </div>
    </div>
  )
}

const CoachTypeSection: React.FC<CoachTypeSectionProps> = ({
  classType,
  coaches
}) => {
  const typeColors = getClassColors(classType)

  return (
    <div className="space-y-2">
      {/* Class Type Header */}
      <div className="flex items-center gap-2 px-2 py-1 sticky top-0 bg-white z-10">
        <div className={`w-2 h-2 rounded-full ${typeColors.dot}`}></div>
        <span className="text-sm font-medium text-gray-600">{classType}</span>
      </div>

      {/* Coaches in this type */}
      <div className="space-y-1 pl-4">
        {coaches.length > 0 ? (
          coaches.map(coach => {
            return (
              <CoachItem
                key={coach.coach_id}
                coach={coach}
              />
            )
          })
        ) : (
          <div className="text-sm text-gray-500 italic pl-3">
            No coaches available for {classType}
          </div>
        )}
      </div>
    </div>
  )
}

export default CoachTypeSection
