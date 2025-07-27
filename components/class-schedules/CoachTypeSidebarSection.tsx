'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Coach } from '@/types/shared'
import { getClassColors, getInitials } from '@/lib/classScheduleUtils'
import ICONS from '@/constants/icons'

interface CoachItemProps {
    coach: Coach
    isSelected: boolean
    isFiltering: boolean
    onClick: (coachName: string) => void
}

const getCoachItemClass = (isSelected: boolean, isFiltering: boolean) =>
    `coach-item p-3 flex gap-3 items-center rounded-md border cursor-pointer transition-all duration-200 ${isFiltering
        ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-200'
        : isSelected
            ? 'border-blue-300 bg-blue-50'
            : 'border-gray-200 hover:bg-blue-50 hover:border-blue-300'
    }`

const CoachItem: React.FC<CoachItemProps> = ({ coach, isSelected, isFiltering, onClick }) => (
    <div
        onClick={() => onClick(coach.name)}
        className={getCoachItemClass(isSelected, isFiltering)}
    >
        <Avatar className="w-8 h-8">
            {/* TODO: Get the real image from the database / url*/}
            <AvatarImage src={`https://ui-avatars.com/api/?name=${coach.name}`} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                {getInitials(coach.name)}
            </AvatarFallback>
        </Avatar>
        <div className="flex-1 flex items-center gap-2">
            <span className='font-medium text-gray-800 text-sm'>{coach.name}</span>
            {isFiltering && <ICONS.classSchedules.filter className="w-3 h-3 text-blue-600" />}
        </div>
    </div>
)

interface CoachTypeSectionProps {
    classType: string
    coaches: Coach[]
    selectedCoach: string | null
    filterCoach: string | null
    onCoachSelect: (coachName: string) => void
}

const CoachTypeSection: React.FC<CoachTypeSectionProps> = ({
    classType,
    coaches,
    selectedCoach,
    filterCoach,
    onCoachSelect
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
                {coaches.map(coach => (
                    <CoachItem
                        key={coach.name}
                        coach={coach}
                        isSelected={selectedCoach === coach.name}
                        isFiltering={filterCoach === coach.name}
                        onClick={onCoachSelect}
                    />
                ))}
            </div>
        </div>
    )
}

export default CoachTypeSection 