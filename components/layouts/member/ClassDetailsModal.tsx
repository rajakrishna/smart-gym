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
// import LABELS from '@/constants/labels';
import type { ClassData } from '@/types/shared';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  classId: string | null;
};

const ClassDetailsModal: React.FC<Props> = ({ isOpen, onClose, classId }) => {
  const [classInfo, setClassInfo] = useState<ClassData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!classId) return;

    const fetchClass = async () => {
      setLoading(true);
      const res = await fetch(`/api/classes/${classId}`);
      const data = await res.json();
      setClassInfo(data);
      setLoading(false);
      console.log('Modal Data:', data)
    };

    fetchClass();
  }, [classId]);

  const handleEnroll = async () => {
    if (!classId) return;

    const res = await fetch('/api/classes/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ class_id: classId }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Enrolled successfully!');
      onClose();
    } else {
      console.error(result.error);
    }
  };
function formatTime(timeString: string): string {
  const [hour, minute] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hour), parseInt(minute));

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{classInfo?.class_name || 'Loading...'}</DialogTitle>
          <DialogDescription>
            {classInfo ? (
              <>
                Category: {classInfo.category}<br/>
                Time: {formatTime(classInfo.time)}<br/>
                {/* <p> */}
                  {/* Coach: {classInfo.coaches?.first_name} {classInfo.coaches?.last_name} */}
                {/* </p> */}
                Capacity: {classInfo.capacity}<br/>
              </>
            ) : (
              'Fetching class details...'
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleEnroll} disabled={!classInfo}>
            Enroll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClassDetailsModal;
