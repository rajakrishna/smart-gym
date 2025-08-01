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
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

interface AllClassesModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ClassItem {
  class_id: string
  class_name: string
  time: string
  category: string
  capacity: number
  scheduled_on: string
  coaches?: {
    first_name?: string
    last_name?: string
  }
}

const AllClassesModal: React.FC<AllClassesModalProps> = ({ isOpen, onClose }) => {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/classes/getAll')
        const data = await res.json()
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => new Date(b.scheduled_on).getTime() - new Date(a.scheduled_on).getTime())
          setClasses(sorted)
        }
      } catch (err) {
        console.error('Error fetching classes:', err)
      }
    }

    if (isOpen) fetchClasses()
  }, [isOpen])

  const handleDelete = async (class_id: string) => {
    setLoadingId(class_id)
    try {
      const res = await fetch('/api/classes/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_id })
      })
      if (res.ok) {
        setClasses(prev => prev.filter(cls => cls.class_id !== class_id))
      } else {
        const err = await res.json()
        console.error('Delete failed:', err.error)
      }
    } catch (err) {
      console.error('Delete error:', err)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ICONS.classSchedules.calendar className="h-5 w-5" />
            All Scheduled Classes
          </DialogTitle>
          <DialogDescription>
            Here's a full list of all scheduled classes in the system.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[500px] space-y-4 pr-2">
          {classes.map((cls) => (
            <div key={cls.class_id} className="p-3 border rounded-md bg-muted shadow-sm space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-base font-semibold">{cls.class_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(cls.scheduled_on).toLocaleDateString()} • {cls.time}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Coach:{' '}
                    {cls.coaches?.first_name && cls.coaches?.last_name
                      ? `${cls.coaches.first_name} ${cls.coaches.last_name}`
                      : 'Unassigned'}
                  </div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {cls.category} • {cls.capacity} spots
                  </Badge>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(cls.class_id)}
                  disabled={loadingId === cls.class_id}
                >
                  <ICONS.classSchedules.delete className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AllClassesModal
