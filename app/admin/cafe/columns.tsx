"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitialsForAvatars } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
    orderID: number
    orderDate: string
    customerName: string
    amountPaid: number
}

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "orderID",
        header: "Order ID",
    },
    {
        accessorKey: "orderDate",
        header: "Order Date",
    },
    {
        accessorKey: "customerName",
        header: "Customer Name",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={getInitialsForAvatars(row.original.customerName)} />
                        <AvatarFallback>{getInitialsForAvatars(row.original.customerName)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-gray-500">{row.original.customerName}</div>
                </div>
            )
        }
    },
    {
        accessorKey: "amountPaid",
        header: "Amount Paid",
        cell: ({ row }) => {
            return <div>${row.original.amountPaid.toFixed(2)}</div>
        }
    },
]