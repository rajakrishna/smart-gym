// page.tsx (server component) is where we'll fetch data and render our table.
import React from 'react'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'
import { DataTable } from '@/components/ui/data-table'
import SendMessageModal from '@/components/admin/messages/modals/SendMessageModal'
import { Message } from '@/types/shared'

async function getData() {
    try {

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/messages/getAll`, {
            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (data.status === 'ok' && data.messages) {
            const mappedMessages = data.messages.map((message: Message) => ({
                id: message.message_id,
                from: message.email,
                messageType: message.delivery_method,
                subject: message.title,
                createdAt: new Date(message.sent_at).toLocaleDateString()
            }))

            return mappedMessages
        }

        return []
    } catch (error) {
        console.error('Error fetching messages:', error)
        return []
    }
}

const Page = async () => {
    const data = await getData()

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-end">
                <SendMessageModal>
                    <Button className="mt-4 bg-green-500 hover:bg-green-600" >
                        <ICONS.adminMessagesPage.createMessage />
                        {LABELS.pages.admin_messages.buttons.createMessage}
                    </Button>
                </SendMessageModal>
            </div>
            <div className="mt-4">
                <DataTable columns={columns} data={data} />
            </div>
        </div >
    )
}

export default Page