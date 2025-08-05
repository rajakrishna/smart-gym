'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ICONS from '@/constants/icons'

interface ClassActionModalProps {
    isOpen: boolean
    onClose: () => void
    classTitle: string
    onCancel: () => void
}

const ClassActionModal: React.FC<ClassActionModalProps> = ({
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
                        <ICONS.classSchedules.cancelClass className="h-5 w-5" />
                        Class Actions
                    </DialogTitle>
                    <DialogDescription>
                        What would you like to do with &ldquo;{classTitle}&rdquo;?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Keep Class
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                        <ICONS.classSchedules.cancel className="h-4 w-4" />
                        Cancel Class
                    </Button>
                    {/* <Button
                        variant="destructive"
                        onClick={onDelete}
                        className="flex items-center gap-2"
                    >
                        <ICONS.classSchedules.delete className="h-4 w-4" />
                        Delete Class
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ClassActionModal