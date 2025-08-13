'use client'
import React, { useState, useEffect } from 'react'
import { columns, Member } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { User } from '@/types/shared'
import SearchMembersComponent from '@/components/admin/members/SearchMembersComponent'
import LABELS from '@/constants/labels'

const MembersPage = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/user/getAll`, {
          method: 'GET',
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const users: User[] = payload.users || payload || []

        // Map DB fields directly → table rows
        const mappedMembers: Member[] = (users ?? []).map((user: User) => ({
          id: user.user_id ?? '', // single source of truth for routing
          memberName: `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || 'Unknown User',
          memberEmail: user.email ?? 'no-email@example.com',
          memberPhone: user.phone ?? 'No phone',
          memberImage: user.user_image ?? undefined, // use the DB image if present
          memberCheckedInStatus: false, // set real status if/when you have it
        }))

        setData(mappedMembers)
      } catch {
        setData([]) 
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredData = data.filter((member) => {
    const searchLower = search.toLowerCase().trim()
    if (!searchLower) return true

    return (
      member.memberName.toLowerCase().includes(searchLower) ||
      member.memberEmail.toLowerCase().includes(searchLower) ||
      member.memberPhone.toLowerCase().includes(searchLower)
    )
  })

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">{LABELS.pages.admin_members.loading.loadingMembers}.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <SearchMembersComponent search={search} onSearchChange={setSearch} />
      <div className="mt-4">
        <DataTable columns={columns} data={filteredData} />
        {data.length === 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            {LABELS.pages.admin_members.loading.loadingMembers}
          </div>
        )}
      </div>
    </div>
  )
}

export default MembersPage
