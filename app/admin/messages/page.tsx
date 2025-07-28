// page.tsx (server component) is where we'll fetch data and render our table.
import React from 'react'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'
import { DataTable } from '@/components/ui/data-table'

async function getData() {
    // TODO: Fetch data from the database
    return [
        {
            id: "1",
            from: "John Smith",
            messageType: "Email",
            message: "Hello, how are you?",
            createdAt: "2021-01-01"
        },
        {
            id: "2",
            from: "Sarah Johnson",
            messageType: "SMS",
            message: "Hello, how are you?",
            createdAt: "2021-01-01"
        },
        {
            id: "3",
            from: "Mike Wilson",
            messageType: "Email",
            message: "Hello, how are you?",
            createdAt: "2021-01-01"
        },
        {
            id: "4",
            from: "Emily Davis",
            messageType: "SMS",
            message: "Hello, how are you?",
            createdAt: "2021-01-01"
        },
        {
            id: "5",
            from: "David Brown",
            messageType: "Email",
            message: "Hello, how are you?",
            createdAt: "2021-01-01"
        },
        {
            id: "6",
            from: "David Brown",
            messageType: "SMS",
            message: "Hello, how are you?",
            createdAt: "2021-01-01"
        }
    ]
}

const Page = async () => {
    const data = await getData()

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mt-4">
                <DataTable columns={columns} data={data} />
            </div>
            <Button className="mt-4 bg-green-500 hover:bg-green-600" >
                <ICONS.adminMembersPage.addMember />
                {LABELS.pages.admin_messages.buttons.createMessage}
            </Button>
        </div >
    )
}

export default Page