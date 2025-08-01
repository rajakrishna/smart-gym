'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';
import type { ClassFormData, ClassType, Coach } from '@/types/shared';

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  classForm: ClassFormData;
  setClassForm: React.Dispatch<React.SetStateAction<ClassFormData>>;
  classTypes: readonly ClassType[];
}

const initialClassForm: ClassFormData = {
  class_name: '',
  coach_id: '',
  category: '',
  time: '',
  capacity: 0,
};

const AddClassModal: React.FC<AddClassModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  classForm,
  setClassForm,
  classTypes,
}) => {
  const [loading, setLoading] = useState(false);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [coachLoading, setCoachLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      setCoachLoading(true);
      const response = await fetch('/api/coaches/getAll');
      const data = await response.json();

      if (!response.ok) {
        console.error('Error fetching coaches:', data.error);
      } else {
        setCoaches(data);
      }
      setCoachLoading(false);
    };

    fetchCoaches();
  }, []);

  const handleAddClass = async () => {
    if (!selectedDate) return;

    setLoading(true);
    const response = await fetch('/api/classes/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...classForm,
        scheduled_on: selectedDate.toISOString().split('T')[0],
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      setClassForm(initialClassForm);
      onClose();
    } else {
      console.error(result.error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <ICONS.classSchedules.add className='h-5 w-5' />
            {LABELS.classSchedules.modals.addClass.title}
          </DialogTitle>
          <DialogDescription>
            {LABELS.classSchedules.modals.addClass.description}{' '}
            {selectedDate?.toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          {/* Class Name */}
          <div className='grid gap-2'>
            <Label htmlFor='class_name' className='flex items-center gap-2'>
              <ICONS.classSchedules.type className='h-4 w-4' />
              Class Name
            </Label>
            <Input
              id='class_name'
              value={classForm.class_name}
              onChange={e =>
                setClassForm(prev => ({
                  ...prev,
                  class_name: e.target.value,
                }))
              }
              placeholder='Enter class name'
            />
          </div>

          {/* Coach Select */}
          <div className='grid gap-2'>
            <Label htmlFor='coach_id' className='flex items-center gap-2'>
              <ICONS.classSchedules.coach className='h-4 w-4' />
              Coach
            </Label>
            <Select
              value={classForm.coach_id}
              onValueChange={value =>
                setClassForm(prev => ({
                  ...prev,
                  coach_id: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select a coach' />
              </SelectTrigger>
              <SelectContent>
                {coachLoading ? (
                  <div className='px-4 py-2 text-muted-foreground text-sm'>Loading...</div>
                ) : coaches.length > 0 ? (
                  coaches.map(coach => (
                    <SelectItem key={coach.coach_id} value={coach.coach_id}>
                      {coach.first_name} {coach.last_name}
                    </SelectItem>
                  ))
                ) : (
                  <div className='px-4 py-2 text-muted-foreground text-sm'>No coaches available</div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className='grid gap-2'>
            <Label htmlFor='category' className='flex items-center gap-2'>
              <ICONS.classSchedules.type className='h-4 w-4' />
              Category
            </Label>
            <Select
              value={classForm.category}
              onValueChange={value =>
                setClassForm(prev => ({
                  ...prev,
                  category: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select category' />
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

          {/* Time Input */}
          <div className='grid gap-2'>
            <Label htmlFor={LABELS.classSchedules.modals.addClass.fields.time} className='flex items-center gap-2'>
              <ICONS.classSchedules.time className='h-4 w-4' />
              {LABELS.classSchedules.modals.addClass.fields.time}
            </Label>
            <Input
              id={LABELS.classSchedules.modals.addClass.fields.time}
              type='time'
              value={classForm.time}
              onChange={e => setClassForm(prev => ({ ...prev, time: e.target.value }))}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='capacity' className='flex items-center gap-2'>
              <ICONS.classSchedules.users className='h-4 w-4' />
              Capacity
            </Label>
            <Input
              id='capacity'
              type='number'
              value={classForm.capacity}
              onChange={e =>
                setClassForm(prev => ({
                  ...prev,
                  capacity: parseInt(e.target.value || '0'),
                }))
              }
              placeholder='Enter class capacity'
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAddClass}
            disabled={
              loading ||
              !classForm.class_name ||
              !classForm.coach_id ||
              !classForm.category ||
              !classForm.time ||
              !classForm.capacity
            }
            className='flex items-center gap-2'
          >
            <ICONS.classSchedules.add className='h-4 w-4' />
            {loading ? 'Adding...' : 'Add Class'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassModal;
