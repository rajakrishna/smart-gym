// page.tsx (server component) is where we'll fetch data and render our table.
import React from 'react'
import { columns, Member } from './columns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'
import { DataTable } from '@/components/ui/data-table'
import { User } from '@/types/shared'

// Mock data as fallback
const mockMembersData: Member[] = [
    {
        id: "1",
        memberName: "John Smith",
        memberEmail: "john.smith@email.com",
        memberPhone: "(555) 123-4567",
        memberImage: "https://ui-avatars.com/api/?name=John+Smith",
        memberCheckedInStatus: true
    },
    {
        id: "2",
        memberName: "Sarah Johnson",
        memberEmail: "sarah.johnson@email.com",
        memberPhone: "(555) 234-5678",
        memberImage: "https://ui-avatars.com/api/?name=Sarah+Johnson",
        memberCheckedInStatus: false
    },
    {
        id: "3",
        memberName: "Mike Wilson",
        memberEmail: "mike.wilson@email.com",
        memberPhone: "(555) 345-6789",
        memberImage: "https://ui-avatars.com/api/?name=Mike+Wilson",
        memberCheckedInStatus: true
    },
]

async function getData(): Promise<Member[]> {
    try {

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/user/getAll`, {
            method: 'GET',
            cache: 'no-store',
        })

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        const responseData = await response.json()

        const users: User[] = responseData.users || responseData

        if (!users || !Array.isArray(users) || users.length === 0) {
            return mockMembersData
        }

        const mappedMembers: Member[] = users.map((user: User) => ({
            id: user.user_id?.toString() || Math.random().toString(),
            memberName: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown User',
            memberEmail: user.email || 'no-email@example.com',
            memberPhone: user.phone || 'No phone',
            memberImage: user.user_image || 'No image',
            memberCheckedInStatus: Math.random() > 0.5
        }))

        return mappedMembers

    } catch (error) {
        console.error('Error fetching members:', error)
        return mockMembersData
    }
}


const page = async () => {
    const data = await getData()
    console.log('mappedMembers', data)

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center gap-4">
                <Input placeholder={LABELS.pages.admin_members.buttons.searchMembers} />
                <Button variant="outline"> <ICONS.adminMembersPage.search />{LABELS.pages.admin_members.buttons.searchMembers}</Button>
            </div>
            <div className="mt-4">
                <DataTable columns={columns} data={data} />
            </div>
            {/* <Button className="mt-4 bg-green-500 hover:bg-green-600" >
                <ICONS.adminMembersPage.addMember />
                {LABELS.pages.admin_members.buttons.addMember}
            </Button> */}
        </div >
    )
}

export default page