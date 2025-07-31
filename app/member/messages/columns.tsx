// columns.tsx (client component) will contain our column definitions.
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
import LABELS from "@/constants/labels"
import { getInitialsForAvatars } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Messages = {
    id: string
    from: string
    messageType: string
    message: string
    createdAt: string
}

// const messageTypeBadge = (messageType: string) => {
//     const normalizedType = messageType.toLowerCase()

//     // TODO: Map this stuff

//     if (normalizedType === "email") {
//         return <Badge variant="outline" className="bg-blue-500 text-white"><span className="font-medium">{messageType}</span></Badge>
//     } else if (normalizedType === "sms") {
//         return <Badge variant="outline" className="bg-green-500 text-white"><span className="font-medium">{messageType}</span></Badge>
//     } else if (normalizedType === "push") {
//         return <Badge variant="outline" className="bg-yellow-500 text-white"><span className="font-medium">{messageType}</span></Badge>
//     } else {
//         return <Badge variant="outline" className="bg-gray-500 text-white"><span className="font-medium">{messageType}</span></Badge>
//     }
// }

export const columns: ColumnDef<Messages>[] = [
    {
        accessorKey: LABELS.pages.admin_messages.columns.accessorKeys.from,
        header: LABELS.pages.admin_messages.columns.header.from,
        cell: ({ row }) => {
            const name = row.getValue("from") as string
            return (<div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${name}`} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {getInitialsForAvatars(name)}
                    </AvatarFallback>
                </Avatar>
                <span className="font-medium">{name}</span>
            </div>
            )
        }
    },
    // {
    //     accessorKey: LABELS.pages.admin_messages.columns.accessorKeys.messageType,
    //     header: LABELS.pages.admin_messages.columns.header.messageType,
    //     cell: ({ row }) => {
    //         const messageType = row.getValue("messageType") as string
    //         return messageTypeBadge(messageType)
    //     }
    // },
    {
        accessorKey: LABELS.pages.admin_messages.columns.accessorKeys.message,
        header: LABELS.pages.admin_messages.columns.header.message,
    },
    // {
    //     accessorKey: LABELS.pages.admin_messages.columns.accessorKeys.createdAt,
    //     header: LABELS.pages.admin_messages.columns.header.createdAt,
    // },
]