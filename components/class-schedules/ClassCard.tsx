'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ClassScheduleItem } from '@/types/shared'
import { getClassColors, formatTime } from '@/lib/classScheduleUtils'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'

interface ClassCardProps {
    classItem: ClassScheduleItem
    onViewUsers: (classId: string, classTitle: string) => void
    onCancel: (classId: string, classTitle: string) => void
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem, onCancel, onViewUsers }) => {
    // Used to color code things based off of the class type
    const colors = getClassColors(classItem.category);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [classes, setClasses] = useState<ClassScheduleItem[]>([])

    const coachFullName = classItem.coaches?.first_name && classItem.coaches?.last_name
        ? `${classItem.coaches.first_name} ${classItem.coaches.last_name}`
        : 'Unassigned';

    return (
        <div className={`bg-muted relative rounded-md p-3 pl-6 text-sm border hover:shadow-md transition-shadow after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full ${colors.indicator}`}>
            <div className={`font-medium ${!classItem.is_active ? 'line-through text-muted-foreground italic' : ''}`}>
                {classItem.class_name}
            </div>
            <div className="text-muted-foreground text-xs">{formatTime(classItem.time)}</div>
            <div className="text-muted-foreground text-xs mt-1">
                {LABELS.classSchedules.page.classes.coachLabel} {coachFullName}
            </div>
            <div className="mt-2 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                <Badge variant="outline" className={`text-xs ${colors.badge}`}>
                    {classItem.category}
                </Badge>
                {!classItem.is_active && (
                    <Badge variant="destructive" className="text-xs mr-1.5">
                    {LABELS.classSchedules.page.classes.cancelled}
                    </Badge>
                )}
                </div>
                <div className="flex gap-1">
                    {/* Cancel / Delete Class Icon */}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                        onClick={() => onCancel(classItem.class_id, classItem.class_name)}
                    >
                        <ICONS.classSchedules.cancelClass className="w-3 h-3" />
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => onViewUsers(classItem.class_id, classItem.class_name)}
                    >
                        <ICONS.classSchedules.users className="w-3 h-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
