import { DataTable } from '@/components/ui/data-table'
import { Message } from '@/types/shared'
import React from 'react'
import { columns } from './columns'

const recentMessagesDashboardTable = async () => {

    const fetchMessages = async () => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
            const response = await fetch(`${baseUrl}/api/messages/getAll`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch messages')
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

                return mappedMessages.slice(0, 3)
            }

            return []
        } catch (error) {
            console.error('Error fetching messages:', error)
            return []
        }
    }

    const data = await fetchMessages()

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Recent Messages</h1>
            <DataTable columns={columns} data={data} dashboardPath='/admin/messages' />
        </div>
    )
}

export default recentMessagesDashboardTable