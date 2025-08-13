'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EnrolledBooking } from '@/types/shared';
import LABELS from '@/constants/labels';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date.toLocaleTimeString('en-US', { hour: '2-digit' });
};

export type EnrolledCardProps = {
  item: EnrolledBooking;
  isWaitlisted?: boolean;
  onCancel?: (booking: EnrolledBooking) => Promise<void> | void;
};

export default function EnrolledCard({
  item,
  isWaitlisted = false,
  onCancel,
}: EnrolledCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [armed, setArmed] = useState(false);

  const openConfirm = () => {
    if (!onCancel) return;
    setArmed(true);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (submitting) return;
    setConfirmOpen(false);
    setArmed(false);
  };

  const handleConfirmCancel = async () => {
    if (!onCancel) return;
    try {
      setSubmitting(true);
      await onCancel(item);
      setConfirmOpen(false);
      setArmed(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="border rounded-lg p-4 shadow-sm bg-white flex items-center">
        <div className="flex-shrink-0 w-14 text-center">
          <p className="text-sm">{formatDate(item.class_details.scheduled_on)}</p>
          <p>{formatTime(item.class_details.time)}</p>
        </div>

        <div className="flex-1 px-4">
          <h2 className="text-lg font-semibold">{item.class_details.class_name}</h2>
          <p className="text-gray-600 capitalize mb-1">{item.class_details.category}</p>
          {isWaitlisted ? (
            <p className="text-sm text-yellow-600">{LABELS.memberDash.schedule.status1}</p>
          ) : (
            <p className="text-sm text-green-700">{LABELS.memberDash.schedule.status2}</p>
          )}
        </div>

        <div className="flex-shrink-0 w-24 flex justify-center">
          <Button
            variant={armed ? 'destructive' : 'secondary'}
            className={`border h-10 my-auto transition-colors
              ${armed
                ? 'text-destructive-foreground'
                : 'text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive'
              }`}
            onClick={openConfirm}
            disabled={!onCancel || submitting}
          >
            {submitting ? LABELS.memberDash.schedule.cancelling : LABELS.memberDash.schedule.button}
          </Button>
        </div>
      </div>

      <Dialog
        open={confirmOpen}
        onOpenChange={(open) => (open ? setConfirmOpen(true) : closeConfirm())}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{LABELS.memberDash.schedule.confirmTitle}</DialogTitle>
            <DialogDescription>
              {LABELS.memberDash.schedule.confirmDescription}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeConfirm} disabled={submitting}>
              {LABELS.memberDash.schedule.keepBooking}
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmCancel}
              disabled={submitting}
            >
              {submitting ? LABELS.memberDash.schedule.cancelling : LABELS.memberDash.schedule.confirmCancel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
