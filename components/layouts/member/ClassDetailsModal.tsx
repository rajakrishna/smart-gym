'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/user-context';
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
  const [enrollStatus, setEnrollStatus] = useState<'idle' | 'success' |'error'>('idle')
  const user = useUser()
// console.log('modal user:', user?.user_id)
  useEffect(() => {
    if (!classId) return;

    const fetchClass = async () => {
      setLoading(true);
      const res = await fetch(`/api/classes/${classId}`);
      const data = await res.json();
      setClassInfo(data);
      setLoading(false);
      console.log('Modal Class Data:', data)
    };

    fetchClass();
  }, [classId]);

  useEffect(() => {
  if (enrollStatus === 'success') {
    const timer = setTimeout(() => {
      onClose();
      setEnrollStatus('idle');
    }, 2500);
    return () => clearTimeout(timer);
  }
}, [enrollStatus, onClose]);
  const handleEnroll = async () => {
    if (!classId || !user?.user_id) return;

    const res = await fetch('/api/user/createEnroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        class_id: classId, 
        user_id: user.user_id,
        status: 'confirmed'
      }),
    });

    const result = await res.json();
    if (res.ok) {
      setEnrollStatus('success')
    } else {
      console.error(result.error || 'Enrollment failed')
      alert('Enrollment failed. Please try again');
      setEnrollStatus('error')
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
  <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="sm:max-w-lg text-center">
      {enrollStatus === 'idle' && (
        <>
          <DialogHeader>
            <DialogTitle>{classInfo?.class_name || 'Loading...'}</DialogTitle>
            <DialogDescription>
              {classInfo ? (
                <>
                  Category: {classInfo.category}<br />
                  Time: {formatTime(classInfo.time)}<br />
                  Capacity: {classInfo.capacity}<br />
                </>
              ) : (
                'Fetching class details...'
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleEnroll} disabled={!classInfo}>
              Enroll
            </Button>
          </DialogFooter>
        </>
      )}

      {enrollStatus === 'success' && (
        <div className="space-y-4 py-6">
          <h2 className="text-2xl font-bold">Get ready to sweat!</h2>
          <p className="text-muted-foreground">
            {classInfo?.class_name ?? 'The class'} has been added to your schedule.
          </p>
          <Button onClick={onClose}>Close</Button>
        </div>
      )}

      {enrollStatus === 'error' && (
        <div className="space-y-4 py-6">
          <h2 className="text-2xl font-bold text-red-600"> Enrollment Failed</h2>
          <p className="text-muted-foreground">Please try again later.</p>
          <Button onClick={() => setEnrollStatus('idle')}>Try Again</Button>
        </div>
      )}
    </DialogContent>
  </Dialog>
  );
};

export default ClassDetailsModal;
