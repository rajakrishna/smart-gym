'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Coach } from '@/types/shared'
import { getClassColors } from '@/lib/classScheduleUtils'
import { getInitialsForAvatars } from '@/lib/utils'

interface CoachItemProps {
    coach: Coach
}

const CoachItem: React.FC<CoachItemProps> = ({ coach }) => (
    <div className="coach-item p-3 flex gap-3 items-center rounded-md border border-gray-200 bg-white">
        <Avatar className="w-8 h-8">
            {/* TODO: Get the real image from the database / url*/}
            <AvatarImage src={`https://ui-avatars.com/api/?name=${coach.name}`} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                {getInitialsForAvatars(coach.name)}
            </AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <span className='font-medium text-gray-800 text-sm'>{coach.name}</span>
        </div>
    </div>
)

interface CoachTypeSectionProps {
    classType: string
    coaches: Coach[]
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

            {/* Coaches in specific type */}
            <div className="space-y-1 pl-4">
                {coaches.map(coach => (
                    <CoachItem
                        key={coach.name}
                        coach={coach}
                    />
                ))}
            </div>
        </div>
    )
}

export default CoachTypeSection 