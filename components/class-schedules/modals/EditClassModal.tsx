'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import ICONS from '@/constants/icons'
import type { ClassFormData, Coach, ClassData, ClassType } from '@/types/shared'

interface EditClassModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | undefined
  classForm: ClassFormData
  setClassForm: React.Dispatch<React.SetStateAction<ClassFormData>>
  availableClasses: ClassData[]
  classTypes: readonly ClassType[]
  fetchClasses: () => Promise<void>;
}

const EditClassModal: React.FC<EditClassModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  classForm,
  setClassForm,
  availableClasses,
  classTypes
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [coachLoading, setCoachLoading] = useState(true)

  useEffect(() => {
    const fetchCoaches = async () => {
      setCoachLoading(true)
      const response = await fetch('/api/coaches/getAll')
      const data = await response.json()

      if (!response.ok) {
        console.error('Error fetching coaches:', data.error)
      } else {
        setCoaches(data)
      }
      setCoachLoading(false)
    }

    fetchCoaches()
  }, [])

  useEffect(() => {
    if (!selectedClassId) return;

    const cls = availableClasses.find(c => c.class_id === selectedClassId);
    if (cls) {
      setClassForm({
        coach_id: cls.coach_id,
        class_name: cls.class_name,
        category: cls.category,
        title: cls.class_name,
        type: cls.category,
        duration: cls.duration,
        time: cls.time,
        capacity: cls.capacity,
      });
    }
  }, [selectedClassId, availableClasses, setClassForm]);

  const handleUpdateClass = async () => {
    if (!selectedClassId || !selectedDate) return
    setLoading(true)
    const response = await fetch('/api/classes/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...classForm,
        class_id: selectedClassId,
        scheduled_on: selectedDate.toISOString().split('T')[0]
      })
    })
    setLoading(false)

    const result = await response.json()
    if (response.ok) {
      setSelectedClassId('')
      setClassForm({
        coach_id: '',
        class_name: '',
        category: '',
        title: '',
        type: '',
        duration: 60,
        time: '',
        capacity: 0,
      })
      onClose()
    } else {
      console.error(result.error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ICONS.classSchedules.edit className="h-5 w-5" />
            Edit Class
          </DialogTitle>
          <DialogDescription>
            Select a class to edit on{' '}
            {selectedDate?.toLocaleDateString('en-US', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Class Selection */}
          <div className="grid gap-2">
            <Label>Select Class</Label>
            <Select onValueChange={(value) => setSelectedClassId(value)} value={selectedClassId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a class" />
              </SelectTrigger>
              <SelectContent>
                {availableClasses.map((cls, idx) => (
                  <SelectItem key={cls.class_id || idx} value={cls.class_id}>
                    {(cls.class_name || 'Unnamed')} — {(cls.time || 'No time')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Coach Selection */}
          <div className="grid gap-2">
            <Label>Coach</Label>
            <Select
              value={classForm.coach_id}
              onValueChange={(value) => setClassForm(prev => ({ ...prev, coach_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a coach" />
              </SelectTrigger>
              <SelectContent>
                {coachLoading ? (
                  <div className="px-4 py-2 text-muted-foreground text-sm">
                    Loading...
                  </div>
                ) : coaches.length > 0 ? (
                  coaches.map((coach) => (
                    <SelectItem key={coach.coach_id} value={coach.coach_id}>
                      {coach.first_name} {coach.last_name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-4 py-2 text-muted-foreground text-sm">
                    No coaches available
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Form Fields */}
          <div className="grid gap-2">
            <Label>Class Name</Label>
            <Input value={classForm.class_name} onChange={(e) => setClassForm(prev => ({ ...prev, class_name: e.target.value }))} />
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <Select value={classForm.category} onValueChange={(value) => setClassForm(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {classTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Start Time</Label>
              <Input type="time" value={classForm.time} onChange={(e) => setClassForm(prev => ({ ...prev, time: e.target.value }))} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Capacity</Label>
            <Input
              type="number"
              value={classForm.capacity}
              onChange={(e) => setClassForm(prev => ({ ...prev, capacity: parseInt(e.target.value || '0') }))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdateClass} disabled={!selectedClassId || loading}>
            {loading ? 'Updating...' : 'Update Class'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditClassModal;
