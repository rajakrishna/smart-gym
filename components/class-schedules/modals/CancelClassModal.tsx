'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'

interface CancelClassModalProps {
    isOpen: boolean
    onClose: () => void
    classTitle: string
    onCancel: () => void
}

const CancelClassModal: React.FC<CancelClassModalProps> = ({
    isOpen,
    onClose,
    classTitle,
    onCancel
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ICONS.classSchedules.cancel className="h-5 w-5" />
                        {LABELS.classSchedules.modals.cancelClass.title}
                    </DialogTitle>
                    <DialogDescription>
                        {LABELS.classSchedules.modals.cancelClass.description} &ldquo;{classTitle}&rdquo;?
                        {LABELS.classSchedules.modals.cancelClass.details}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        {LABELS.classSchedules.modals.cancelClass.buttons.keep}
                    </Button>
                    <Button variant="destructive" onClick={onCancel} className="flex items-center gap-2">
                        <ICONS.classSchedules.cancel className="h-4 w-4" />
                        {LABELS.classSchedules.modals.cancelClass.buttons.cancel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CancelClassModal 