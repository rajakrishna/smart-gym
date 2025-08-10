import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { columns } from './columns'
import ICONS from '@/constants/icons'
import Link from 'next/link'

async function getData() {
    // TODO: Fetch data from the database
    return [
        {
            id: "1",
            from: "Coach Mike",
            messageType: "Message",
            subject: "Logan, great class today 🔥",
            message: "Hello, how are you?",
            createdAt: "2021-01-01"
        },
        {
            id: "2",
            from: "Coach Sarah ",
            messageType: "SMS",
            subject: "Excited to see you in class!",
            message: "Hello, how are you?",
            createdAt: "2021-01-01"
        },
        {
            id: "3",
            from: "Gym Staff",
            messageType: "Email",
            subject: "Logan, how's everything going?",
            message: "Hello, how are you?",
            createdAt: "2021-01-01"
        },

    ]
}

const page = async () => {

    const data = await getData()

    return (
        <div className="container mx-auto py-10 px-4">
            <Link href={'/member/dashboard'} className='flex justify-end w-full pr-4'>
            <ICONS.classSchedules.cancel />
            </Link>
            <div className="mt-4">
                <DataTable columns={columns} data={data} />
            </div>
        </div >
    )
}

export default page