'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'

interface DeleteClassModalProps {
    isOpen: boolean
    onClose: () => void
    classTitle: string
    onDelete: () => void
}

const DeleteClassModal: React.FC<DeleteClassModalProps> = ({
    isOpen,
    onClose,
    classTitle,
    onDelete
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ICONS.classSchedules.delete className="h-5 w-5" />
                        {LABELS.classSchedules.modals.deleteClass.title}
                    </DialogTitle>
                    <DialogDescription>
                        {LABELS.classSchedules.modals.deleteClass.description} &ldquo;{classTitle}&rdquo;?
                        {LABELS.classSchedules.modals.deleteClass.details}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        {LABELS.classSchedules.modals.deleteClass.buttons.cancel}
                    </Button>
                    <Button variant="destructive" onClick={onDelete} className="flex items-center gap-2">
                        <ICONS.classSchedules.delete className="h-4 w-4" />
                        {LABELS.classSchedules.modals.deleteClass.buttons.delete}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteClassModal 