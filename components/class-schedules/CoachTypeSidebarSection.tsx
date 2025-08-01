'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Coach } from '@/types/shared'
import { getClassColors } from '@/lib/classScheduleUtils'
import { getInitialsForAvatars } from '@/lib/utils'
// import ICONS from '@/constants/icons'

interface CoachItemProps {
  coach: Coach
}

interface CoachTypeSectionProps {
  // coaches: Coach[]
  classType: string
}


// const getCoachItemClass = (isSelected: boolean, isFiltering: boolean) =>
//   `coach-item p-3 flex gap-3 items-center rounded-md border cursor-pointer transition-all duration-200 ${
//     isFiltering
//       ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-200'
//       : isSelected
//       ? 'border-blue-300 bg-blue-50'
//       : 'border-gray-200 hover:bg-blue-50 hover:border-blue-300'
//   }`

const CoachItem: React.FC<CoachItemProps> = ({ coach }) => {
  const fullName = `${coach.first_name ?? 'Unknown'} ${coach.last_name ?? ''}`.trim()
  return (
    <div className="coach-item p-3 flex gap-3 items-center rounded-md border border-gray-200 bg-white">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={coach.profile_picture || `https://ui-avatars.com/api/?name=${coach.first_name}+${coach.last_name}`}
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

// interface CoachTypeSectionProps {
//     classType: string
//     coaches: Coach[]
// }

// let cachedCoaches: Coach[] | null = null

const CoachTypeSection: React.FC<CoachTypeSectionProps> = ({
  // selectedCoach,
  // filterCoach,
  // onCoachSelect,
  classType,
  // coaches
}) => {
    const typeColors = getClassColors(classType)
    const [coaches, setCoaches] = useState<Coach[]>([])

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch('/api/coaches/getAll')
        const data = await res.json()
        if (Array.isArray(data)) {
          setCoaches(data)
        } else {
          console.error('Unexpected response for coaches:', data)
        }
      } catch (err) {
        console.error('Error fetching coaches:', err)
      }
    }

    fetchCoaches()
  }, [])

    return (
        <div className="space-y-2">
            {/* Class Type Header */}
            <div className="flex items-center gap-2 px-2 py-1 sticky top-0 bg-white z-10">
                <div className={`w-2 h-2 rounded-full ${typeColors.dot}`}></div>
                <span className="text-sm font-medium text-gray-600">{classType}</span>
            </div>

            {/* Coaches in this type */}
            <div className="space-y-1 pl-4">
                {coaches.map(coach => {
                  // const fullName = `${coach.first_name ?? 'Unknown'} ${coach.last_name ?? ''}`.trim()
                  return (
                    <CoachItem
                        key={coach.coach_id ?? `${coach.first_name ?? ''}-${coach.last_name ?? ''}`}
                        coach={coach}
                        // isSelected={selectedCoach === coach.name}
                        // isFiltering={filterCoach === coach.name}
                        // isSelected={selectedCoach === fullName}
                        // isFiltering={filterCoach === fullName}
                        // onClick={onCoachSelect}
                    />
                    
                )})}
            </div>
        </div>
    )
}

export default CoachTypeSection
