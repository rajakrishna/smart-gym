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
  title: '',
  type: '',
  duration: 0,
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
        scheduled_on: selectedDate,
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
          <div className='grid gap-2'>
            <Label htmlFor='class_name' className='flex items-center gap-2'>
              <ICONS.classSchedules.type className='h-4 w-4' />
              {LABELS.classSchedules.modals.addClass.fields.className}
            </Label>
            <Input
              id='class_name'
              value={classForm.class_name}
              onChange={e => setClassForm(prev => ({ ...prev, class_name: e.target.value }))}
              placeholder={LABELS.classSchedules.modals.addClass.placeholders.className}
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='coach_id' className='flex items-center gap-2'>
              <ICONS.classSchedules.coach className='h-4 w-4' />
              {LABELS.classSchedules.modals.addClass.fields.coach}
            </Label>
            <Select
              value={classForm.coach_id}
              onValueChange={value => setClassForm(prev => ({ ...prev, coach_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={LABELS.classSchedules.modals.addClass.placeholders.coach} />
              </SelectTrigger>
              <SelectContent>
                {coachLoading ? (
                  <div className='px-4 py-2 text-muted-foreground text-sm'>
                    {LABELS.classSchedules.modals.addClass.loading}
                  </div>
                ) : coaches.length > 0 ? (
                  coaches.map(coach => (
                    <SelectItem key={coach.coach_id} value={coach.coach_id}>
                      {coach.first_name} {coach.last_name}
                    </SelectItem>
                  ))
                ) : (
                  <div className='px-4 py-2 text-muted-foreground text-sm'>
                    {LABELS.classSchedules.modals.addClass.noCoaches}
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='category' className='flex items-center gap-2'>
              <ICONS.classSchedules.type className='h-4 w-4' />
              {LABELS.classSchedules.modals.addClass.fields.category}
            </Label>
            <Select
              value={classForm.category}
              onValueChange={value => setClassForm(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={LABELS.classSchedules.modals.addClass.placeholders.category} />
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
              {LABELS.classSchedules.modals.addClass.fields.capacity}
            </Label>
            <Input
              id='capacity'
              type='number'
              min='0'
              value={classForm.capacity}
              onChange={e =>
                setClassForm(prev => ({
                  ...prev,
                  capacity: Math.max(0, parseInt(e.target.value || '0')),
                }))
              }
              placeholder={LABELS.classSchedules.modals.addClass.placeholders.capacity}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            {LABELS.classSchedules.modals.addClass.buttons.cancel}
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
            {loading
              ? LABELS.classSchedules.modals.addClass.buttons.adding
              : LABELS.classSchedules.modals.addClass.buttons.add}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassModal;
