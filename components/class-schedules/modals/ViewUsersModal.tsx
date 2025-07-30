import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ApiResponse, EnrolledClassMember } from '@/types/shared'
import React, { useEffect, useState } from 'react'

interface ViewUsersModalProps {
    isOpen: boolean
    onClose: () => void
    classTitle: string
    onViewUsers: () => void
    classId: number
}

const ViewUsersModal: React.FC<ViewUsersModalProps> = ({ isOpen, onClose, classTitle, classId }) => {

    const [enrolledClassMembers, setEnrolledClassMembers] = useState<EnrolledClassMember[]>([]);

    useEffect(() => {
        const fetchEnrolledClassMembers = async () => {
            try {
                const response = await fetch(`/api/example/getEnrolledClassMembers?classId=${classId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch enrolled class members');
                }

                const data: ApiResponse<EnrolledClassMember[]> = await response.json();

                console.log('data', data);

                if (data.success) {
                    setEnrolledClassMembers(data.data);
                } else {
                    throw new Error(data.error || 'Failed to fetch enrolled class members');
                }

            } catch (error) {
                console.error('Error fetching enrolled class members:', error);
            }
        }
        fetchEnrolledClassMembers();
    }, [classId]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Users</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {classTitle}
                </DialogDescription>
                <div className="max-h-96 overflow-y-auto">
                    <div className="flex flex-col gap-4 pr-2">
                        {enrolledClassMembers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default ViewUsersModal