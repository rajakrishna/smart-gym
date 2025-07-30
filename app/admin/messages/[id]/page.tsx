import React from 'react'

async function getData(id: string) {
    try {
        console.log('Attempting to fetch message from API with ID:', id)

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/messages/getByMessageId?message_id=${id}`, {
            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) {
            console.error('API response not ok:', response.status, response.statusText)
            throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log('Successfully fetched message response:', data)

        if (data.status === 'error') {
            console.error('API returned error status:', data.message)
            throw new Error(data.message)
        }

        if (!data.messages || !data.messages[0]) {
            console.error('No message found with ID:', id)
            throw new Error('Message not found')
        }

        console.log('Successfully fetched message:', data.messages[0])
        return data.messages[0]
    } catch (error) {
        console.error('Error fetching message from API:', error)
        throw new Error('Failed to fetch message')
    }
}

const MessageDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const message = await getData(id)

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