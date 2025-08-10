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
import type { ClassData } from '@/types/shared';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  classId: string | null;
};
import { MOTIVATIONAL_MESSAGES } from '@/constants/motivationMessages';
import LABELS from '@/constants/labels';

const ClassDetailsModal: React.FC<Props> = ({ isOpen, onClose, classId }) => {
  const [classInfo, setClassInfo] = useState<ClassData | null>(null);
  const [enrollStatus, setEnrollStatus] = useState<'idle' | 'success' |'error'>('idle')
  const user = useUser()

  useEffect(() => {
    if (!classId) return;

    const fetchClass = async () => {
      const res = await fetch(`/api/classes/${classId}`);
      const data = await res.json();
      setClassInfo(data);
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
      setEnrollStatus('error')
    }
  };

function formatTime(timeString?: string): string {
  if(!timeString) return "TBD"
  const [hour, minute] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hour), parseInt(minute));

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
const randomMessage = MOTIVATIONAL_MESSAGES[Math.floor(Math.random()* MOTIVATIONAL_MESSAGES.length)]
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
                  {LABELS.modals.gymClassModal.category} {classInfo.category}<br />
                  {LABELS.modals.gymClassModal.time} {formatTime(classInfo.time)}<br />
                  {LABELS.modals.gymClassModal.capacity} {classInfo.capacity}<br />
                </>
              ) : (
                'Fetching class details...'
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center gap-2">
            <Button variant="outline" onClick={onClose}>
              {LABELS.modals.gymClassModal.cancelButton}
            </Button>
            <Button onClick={handleEnroll} disabled={!classInfo}>
              {LABELS.modals.gymClassModal.enrollButton}
            </Button>
          </DialogFooter>
        </>
      )}

      {enrollStatus === 'success' && (
        <div className="space-y-4 py-6">
          <h2 className="text-2xl font-bold">{randomMessage}</h2>
          <p className="text-muted-foreground">
            {classInfo?.class_name ?? 'The class'} {LABELS.modals.gymClassModal.success}
          </p>
          <Button onClick={onClose}>{LABELS.modals.gymClassModal.closeButton}</Button>
        </div>
      )}

      {enrollStatus === 'error' && (
        <div className="space-y-4 py-6">
          <h2 className="text-2xl font-bold text-red-600"> {LABELS.modals.gymClassModal.enrollFail}</h2>
          <p className="text-muted-foreground">{LABELS.modals.gymClassModal.tryAgain}</p>
          <Button onClick={() => setEnrollStatus('idle')}>{LABELS.modals.gymClassModal.try}</Button>
        </div>
      )}
    </DialogContent>
  </Dialog>
  );
};

export default ClassDetailsModal;
