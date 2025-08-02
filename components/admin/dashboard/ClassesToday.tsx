'use client'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ICONS from '@/constants/icons'
import React, { useEffect, useState } from 'react'

const mockClasses = [
    {
        id: 1,
        name: 'Class 1',
        classType: 'Yoga',
        description: 'Description 1',
        scheduled: '9:00 AM',
        duration: '1 hour',
        coach: 'Coach 1',
    },
    {
        id: 2,
        name: 'Class 2',
        classType: 'Yoga',
        description: 'Description 2',
        scheduled: '11:00 AM',
        duration: '1 hour',
        coach: 'Coach 2',
    },
    {
        id: 3,
        name: 'Class 3',
        classType: 'Yoga',
        description: 'Description 3',
        scheduled: '12:00 PM',
        duration: '1 hour',
        coach: 'Coach 3',
    },
    {
        id: 4,
        name: 'Class 4',
        classType: 'Yoga',
        description: 'Description 4',
        scheduled: '10:00 AM',
        duration: '1 hour',
        coach: 'Coach 4',
    },
]

const ClassesToday = () => {

    const [classes, setClasses] = useState<any[]>([])


    useEffect(() => {

        const fetchTodaysClasses = async () => {
            try {
                const response = await fetch('/api/classes/getAll?date=' + new Date().toISOString().split('T')[0])
                const data = await response.json()

                console.log(data)

                if (!data) {
                    console.log('No data found')
                    setClasses(mockClasses)
                } else {
                    console.log('Data found')
                    setClasses(data)
                }
            } catch (error) {
                console.error('Error fetching classes:', error)
            }
        }

        fetchTodaysClasses()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Classes Today</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((classItem) => (
                    <Card key={classItem.id}>
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle>{classItem.name}</CardTitle>
                                <CardDescription>{classItem.classType}</CardDescription>
                                <CardDescription>{classItem.description}</CardDescription>
                            </div>
                            <p className="text-sm font-medium text-center">{classItem.coach}</p>
                        </CardHeader>
                        <CardFooter className="flex justify-between items-center">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{classItem.scheduled}</p>
                                <p className="text-sm text-muted-foreground">{classItem.duration}</p>
                            </div>
                            <Button variant="outline">
                                <ICONS.adminMembersPage.editMember />
                                Edit
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div >
        </div >
    )
}

export default ClassesToday