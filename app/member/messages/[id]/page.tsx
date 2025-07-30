import React from 'react'
import { Message } from '@/types/shared'

const mockMessage: Message = {
    message_id: '1',
    title: 'Test Message',
    body: 'This is a test message',
    sent_at: "2021-01-01",
    user_id: '1',
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    delivery_method: 'email',
    type: 'test'
}

// async function getData(id: string): Promise<Message> {
//     try {

//         const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
//         const response = await fetch(`${baseUrl}/api/messages/getByMessageId?message_id=${id}`, {
//             method: 'GET',
//             cache: 'no-store'
//         })

//         if (!response.ok) {
//             throw new Error(`API request failed with status ${response.status}`)
//         }

//         const data = await response.json()

//         if (data.status === 'error') {
//             throw new Error(data.message)
//         }

//         if (!data.messages || !data.messages[0]) {
//             throw new Error('Message not found')
//             return mockMessage
//         }

//         return data.messages[0]
//     } catch (error) {
//         throw new Error('Failed to fetch message', { cause: error })
//     }
// }

const MessageDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    console.log(id)

    // const message = await getData(id)

    const message = mockMessage


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-12 px-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
                                {message.title}
                            </h1>
                        </div>
                        <div className="prose prose-gray max-w-none">
                            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {message.body}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageDetailPage