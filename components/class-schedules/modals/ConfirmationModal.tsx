'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ICONS from '@/constants/icons'
import LABELS from '@/constants/labels'

interface ClassActionModalProps {
    isOpen: boolean
    onClose: () => void
    classTitle: string
    onCancel: () => void
    onKeep: () => void
}

const ClassActionModal: React.FC<ClassActionModalProps> = ({
    isOpen,
    onClose,
    onKeep,
    classTitle,
    onCancel
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ICONS.classSchedules.cancelClass className="h-5 w-5" />
                        {LABELS.classSchedules.modals.confirmClass.title}
                    </DialogTitle>
                    <DialogDescription>
                        {LABELS.classSchedules.modals.confirmClass.descriptionPrefix} &ldquo;{classTitle}&rdquo;?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={onKeep}>
                        {LABELS.classSchedules.modals.confirmClass.keepClass}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                        <ICONS.classSchedules.cancel className="h-4 w-4" />
                        {LABELS.classSchedules.modals.confirmClass.cancelClass}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ClassActionModal
