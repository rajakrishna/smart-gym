// page.tsx (server component) is where we'll fetch data and render our table.
import React from 'react'
import { DataTable } from '../../../../components/ui/data-table'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'

async function getData() {
    // Mock data for demonstration - in a real app, this would fetch from your database
    return [
        {
            id: "1",
            memberName: "John Smith",
            memberEmail: "john.smith@email.com",
            memberPhone: "(555) 123-4567",
            memberCheckedInStatus: true
        },
        {
            id: "2",
            memberName: "Sarah Johnson",
            memberEmail: "sarah.johnson@email.com",
            memberPhone: "(555) 234-5678",
            memberCheckedInStatus: false
        },
        {
            id: "3",
            memberName: "Mike Wilson",
            memberEmail: "mike.wilson@email.com",
            memberPhone: "(555) 345-6789",
            memberCheckedInStatus: true
        },
        {
            id: "4",
            memberName: "Emily Davis",
            memberEmail: "emily.davis@email.com",
            memberPhone: "(555) 456-7890",
            memberCheckedInStatus: false
        },
        {
            id: "5",
            memberName: "David Brown",
            memberEmail: "david.brown@email.com",
            memberPhone: "(555) 567-8901",
            memberCheckedInStatus: true
        }
    ]
}

const page = async () => {
    const data = await getData()

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center gap-4">
                <Input placeholder={LABELS.pages.admin_members.buttons.searchMembers} />
                <Button variant="outline"> <ICONS.adminMembersPage.search />{LABELS.pages.admin_members.buttons.searchMembers}</Button>
            </div>
            <div className="mt-4">
                <DataTable columns={columns} data={data} />
            </div>
            <Button className="mt-4 bg-green-500 hover:bg-green-600" >
                <ICONS.adminMembersPage.addMember />
                {LABELS.pages.admin_members.buttons.addMember}
            </Button>
        </div >
    )
}

export default page