// columns.tsx (client component) will contain our column definitions.
"use client"

import LABELS from "@/constants/labels"
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

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: LABELS.pages.admin_members.columns.accessorKeys.memberName,
        header: LABELS.pages.admin_members.columns.header.memberName,
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
    }
]