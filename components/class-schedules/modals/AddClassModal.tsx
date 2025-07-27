'use client'

// DOCUMENTATION:https://ui.shadcn.com/docs/components/dialog

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'
import type { ClassFormData, Coach, ClassType } from '@/types/shared'

interface AddClassModalProps {
    isOpen: boolean
    onClose: () => void
    selectedDate: Date | undefined
    classForm: ClassFormData
    setClassForm: React.Dispatch<React.SetStateAction<ClassFormData>>
    onAddClass: () => void
    coaches: readonly Coach[]
    classTypes: readonly ClassType[]
}

const AddClassModal: React.FC<AddClassModalProps> = ({
    isOpen,
    onClose,
    selectedDate,
    classForm,
    setClassForm,
    onAddClass,
    coaches,
    classTypes
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ICONS.classSchedules.add className="h-5 w-5" />
                        {LABELS.classSchedules.modals.addClass.title}
                    </DialogTitle>
                    <DialogDescription>
                        {LABELS.classSchedules.modals.addClass.description} {selectedDate?.toLocaleDateString("en-US", {
                            weekday: "long", day: "numeric", month: "long", year: "numeric"
                        })}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Class Title  Input */}
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="flex items-center gap-2">
                            <ICONS.classSchedules.type className="h-4 w-4" />
                            {LABELS.classSchedules.modals.addClass.fields.title}
                        </Label>
                        <Input
                            id={LABELS.classSchedules.modals.addClass.fields.title}
                            value={classForm.title}
                            onChange={(e) => setClassForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder={LABELS.classSchedules.modals.addClass.fields.titlePlaceholder}
                        />
                    </div>

                    {/* Coach Select */}
                    <div className="grid gap-2">
                        <Label htmlFor={LABELS.classSchedules.modals.addClass.fields.coach} className="flex items-center gap-2">
                            <ICONS.classSchedules.coach className="h-4 w-4" />
                            {LABELS.classSchedules.modals.addClass.fields.coach}
                        </Label>
                        <Select value={classForm.coach} onValueChange={(value) => setClassForm(prev => ({ ...prev, coach: value }))}>
                            <SelectTrigger>
                                <SelectValue placeholder={LABELS.classSchedules.modals.addClass.fields.coachPlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {coaches.map(coach => (
                                    <SelectItem key={coach.name} value={coach.name}>
                                        {coach.name} - {coach.type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Class Type Select */}
                    <div className="grid gap-2">
                        <Label htmlFor={LABELS.classSchedules.modals.addClass.fields.type} className="flex items-center gap-2">
                            <ICONS.classSchedules.type className="h-4 w-4" />
                            {LABELS.classSchedules.modals.addClass.fields.type}
                        </Label>
                        <Select value={classForm.type} onValueChange={(value) => setClassForm(prev => ({ ...prev, type: value }))}>
                            <SelectTrigger>
                                <SelectValue placeholder={LABELS.classSchedules.modals.addClass.fields.typePlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {classTypes.map(type => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Time and Duration Select */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor={LABELS.classSchedules.modals.addClass.fields.time} className="flex items-center gap-2">
                                <ICONS.classSchedules.time className="h-4 w-4" />
                                {LABELS.classSchedules.modals.addClass.fields.time}
                            </Label>
                            <Input
                                id={LABELS.classSchedules.modals.addClass.fields.time}
                                type="time"
                                value={classForm.time}
                                onChange={(e) => setClassForm(prev => ({ ...prev, time: e.target.value }))}
                            />
                        </div>

                        {/* Duration Select */}
                        {/* TODO: Maybe make all classes 1 hour by default? */}
                        <div className="grid gap-2">
                            <Label htmlFor={LABELS.classSchedules.modals.addClass.fields.duration} className="flex items-center gap-2">
                                <ICONS.classSchedules.time className="h-4 w-4" />
                                {LABELS.classSchedules.modals.addClass.fields.duration}
                            </Label>
                            <Select
                                value={classForm.duration.toString()}
                                onValueChange={(value) => setClassForm(prev => ({ ...prev, duration: parseInt(value) }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="30">{LABELS.classSchedules.modals.addClass.durations[30]}</SelectItem>
                                    <SelectItem value="45">{LABELS.classSchedules.modals.addClass.durations[45]}</SelectItem>
                                    <SelectItem value="60">{LABELS.classSchedules.modals.addClass.durations[60]}</SelectItem>
                                    <SelectItem value="90">{LABELS.classSchedules.modals.addClass.durations[90]}</SelectItem>
                                    <SelectItem value="120">{LABELS.classSchedules.modals.addClass.durations[120]}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        {LABELS.classSchedules.modals.addClass.buttons.cancel}
                    </Button>
                    <Button
                        onClick={onAddClass}
                        disabled={!classForm.title || !classForm.coach || !classForm.type || !classForm.time}
                        className="flex items-center gap-2"
                    >
                        <ICONS.classSchedules.add className="h-4 w-4" />
                        {LABELS.classSchedules.modals.addClass.buttons.add}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddClassModal 