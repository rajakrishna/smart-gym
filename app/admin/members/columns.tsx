// columns.tsx (client component) will contain our column definitions.
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import LABELS from "@/constants/labels"
import { getInitialsForAvatars } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Member = {
    id: string
    memberName: string
    memberEmail: string
    memberPhone: string
    memberCheckedInStatus: boolean
}

const checkedInStatusBadge = (checkedInStatus: boolean) => {
    return checkedInStatus ? (
        <Badge variant="outline" className="bg-green-500 text-white"><span className="font-medium">{LABELS.pages.admin_members.badges.checkedIn}</span></Badge>
    ) : (
        <Badge variant="outline" className="bg-red-500 text-white"><span className="font-medium">{LABELS.pages.admin_members.badges.checkedOut}</span></Badge>
    )
}

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: LABELS.pages.admin_members.columns.accessorKeys.memberName,
        header: LABELS.pages.admin_members.columns.header.memberName,
        cell: ({ row }) => {
            const name = row.getValue("memberName") as string
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
    {
        accessorKey: LABELS.pages.admin_members.columns.accessorKeys.memberEmail,
        header: LABELS.pages.admin_members.columns.header.memberEmail,
    },
    {
        accessorKey: LABELS.pages.admin_members.columns.accessorKeys.memberPhone,
        header: LABELS.pages.admin_members.columns.header.memberPhone,
    },
    {
        accessorKey: LABELS.pages.admin_members.columns.accessorKeys.memberCheckedInStatus,
        header: LABELS.pages.admin_members.columns.header.memberCheckedInStatus,
        cell: ({ row }) => {
            const checkedInStatus = row.getValue("memberCheckedInStatus") as boolean
            return checkedInStatusBadge(checkedInStatus)
        }
    }
]