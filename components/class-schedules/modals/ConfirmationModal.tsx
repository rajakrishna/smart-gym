'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    classTitle: string
    onConfirm: () => void
    title: string
    description: string
    details: string
    confirmButtonText: string
    cancelButtonText: string
    icon: React.ComponentType<{ className?: string }>
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    classTitle,
    onConfirm,
    title,
    description,
    details,
    confirmButtonText,
    cancelButtonText,
    icon: Icon
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description} &ldquo;{classTitle}&rdquo;?
                        {details}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        {cancelButtonText}
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {confirmButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmationModal