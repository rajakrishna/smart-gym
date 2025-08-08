'use client'

import ICONS from '@/constants/icons'
import LABELS from '@/constants/labels'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchMembersComponentProps {
    search: string
    onSearchChange: (value: string) => void
}

const SearchMembersComponent = ({ search, onSearchChange }: SearchMembersComponentProps) => {
    return (
        <div className="flex justify-between items-center gap-4">
            <Input
                placeholder={LABELS.pages.admin_members.buttons.searchMembers}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <Button variant="outline">
                <ICONS.adminMembersPage.search />
                {LABELS.pages.admin_members.buttons.searchMembers}
            </Button>
        </div>
    )
}

export default SearchMembersComponent