import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import React from 'react'

interface ViewUsersModalProps {
    isOpen: boolean
    onClose: () => void
    classTitle: string
    onViewUsers: () => void
}

const mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
    },
    {
        id: 3,
        name: 'Jim Doe',
        email: 'jim.doe@example.com',
    },
]

const ViewUsersModal: React.FC<ViewUsersModalProps> = ({ isOpen, onClose, classTitle }) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Users</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {classTitle}
                </DialogDescription>
                <div className="flex flex-col gap-4">
                    {mockUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-medium text-gray-900">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default ViewUsersModal