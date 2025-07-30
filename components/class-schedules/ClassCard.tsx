'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ClassScheduleItem } from '@/types/shared'
import { getClassColors, formatTime } from '@/lib/classScheduleUtils'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'

interface ClassCardProps {
    classItem: ClassScheduleItem
    onViewUsers: (classId: number, classTitle: string) => void
    onCancel: (classId: number, classTitle: string) => void
    onDelete: (classId: number, classTitle: string) => void
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem, onCancel, onDelete, onViewUsers }) => {
    // Used to color code things based off of the class type
    const colors = getClassColors(classItem.type)

    return (
        <div className={`bg-muted relative rounded-md p-3 pl-6 text-sm border hover:shadow-md transition-shadow after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full ${colors.indicator}`}>
            <div className="font-medium">{classItem.title}</div>
            <div className="text-muted-foreground text-xs">{formatTime(classItem.time, classItem.duration)}</div>
            <div className="text-muted-foreground text-xs mt-1">
                {LABELS.classSchedules.page.classes.coachLabel} {classItem.coach}
            </div>
            <div className="mt-2 flex items-center justify-between">
                <Badge variant="outline" className={`text-xs ${colors.badge}`}>
                    {classItem.type}
                </Badge>
                <div className="flex gap-1">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                        onClick={() => onCancel(classItem.id, classItem.title)}
                    >
                        <ICONS.classSchedules.cancelClass className="w-3 h-3" />
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDelete(classItem.id, classItem.title)}
                    >
                        <ICONS.classSchedules.delete className="w-3 h-3" />
                    </Button>
                    {/* Button with icon of a user and when clicked it opens a modal that shows all the users that are signed up for the class */}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => onViewUsers(classItem.id, classItem.title)}
                    >
                        <ICONS.classSchedules.users className="w-3 h-3" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ClassCard 