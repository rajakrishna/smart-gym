'use client'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ICONS from '@/constants/icons'
import LABELS from '@/constants/labels'
import { mockClasses } from '@/constants/mockData'
import { ClassScheduleItem } from '@/types/shared'
import React, { useEffect, useState } from 'react'

const ClassesToday = () => {

    const [classes, setClasses] = useState<ClassScheduleItem[]>(mockClasses)


    useEffect(() => {

        const fetchTodaysClasses = async () => {
            try {
                const response = await fetch('/api/classes/getAll?date=' + new Date().toISOString().split('T')[0])
                const data = await response.json()

                if (!data || data.length === 0) {
                    console.log('No data found')
                    setClasses(mockClasses)
                } else {
                    console.log('Data found', data)
                    setClasses(data)
                }
            } catch {
                console.log('Error fetching classes')
                setClasses(mockClasses)
            }
        }

        fetchTodaysClasses()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{LABELS.admin.dashboard.classesToday.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((classItem) => (
                    <Card key={classItem.class_id}>
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle>{classItem.class_name}</CardTitle>
                                <CardDescription>{classItem.category.charAt(0).toUpperCase() + classItem.category.slice(1)}</CardDescription>
                                <CardDescription>{LABELS.admin.dashboard.classesToday.capacity} {classItem.capacity}</CardDescription>
                            </div>
                            <p className="text-sm font-medium text-center">
                                {LABELS.admin.dashboard.classesToday.coach} {classItem.coaches?.first_name} {classItem.coaches?.last_name}
                            </p>
                        </CardHeader>
                        <CardFooter className="flex justify-between items-center">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{LABELS.admin.dashboard.classesToday.scheduledAt} {classItem.time}</p>
                            </div>
                            <Button variant="outline">
                                <ICONS.adminMembersPage.editMember />
                                {LABELS.admin.dashboard.classesToday.editButton}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div >
        </div >
    )
}

export default ClassesToday