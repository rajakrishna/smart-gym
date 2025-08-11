'use client';

import React, { useCallback, useState } from 'react';
import type { EnrolledBooking } from '@/types/shared';
import EnrolledCard from './enrolled-card';
import LABELS from '@/constants/labels';
import { toast } from 'sonner';

export default function EnrolledClassesClient({
  initialClasses,
  memberId,
  baseUrl,
}: {
  initialClasses: EnrolledBooking[];
  memberId: string;
  baseUrl?: string;
}) {
  const [classes, setClasses] = useState<EnrolledBooking[]>(initialClasses);

  const onCancel = useCallback(async (booking: EnrolledBooking) => {
    setClasses(prev =>
      prev.filter(c => !(c.class_id === booking.class_id && c.joined_at === booking.joined_at)),
    );

    try {
      const url = `${baseUrl ?? (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')}/api/user/enrolled/${memberId}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          class_id: booking.class_id,
          joined_at: booking.joined_at,
        }),
      });

      if (!res.ok) {

        setClasses(prev => {
          const exists = prev.some(c => c.class_id === booking.class_id && c.joined_at === booking.joined_at);
          return exists ? prev : [booking, ...prev];
        });
        toast.error(LABELS.memberDash.schedule.toasts.cancelErrorTitle, {
          description: LABELS.memberDash.schedule.toasts.cancelErrorDescription,
          duration: LABELS.memberDash.schedule.toasts.shortDurationMs,
        });
        return;
      }

      toast.success(LABELS.memberDash.schedule.toasts.cancelSuccessTitle, {
        description: `${booking.class_details.class_name} ${LABELS.memberDash.schedule.toasts.cancelSuccessDescriptionSuffix}`,
        duration: LABELS.memberDash.schedule.toasts.shortDurationMs,
      });
    } catch {
      setClasses(prev => {
        const exists = prev.some(c => c.class_id === booking.class_id && c.joined_at === booking.joined_at);
        return exists ? prev : [booking, ...prev];
      });
      toast.error(LABELS.memberDash.schedule.toasts.cancelErrorTitle, {
        description: LABELS.memberDash.schedule.toasts.cancelErrorDescription,
        duration: LABELS.memberDash.schedule.toasts.shortDurationMs,
      });
    }
  }, [memberId, baseUrl]);

  const waitlistedClasses = classes.filter(c => c.waitlisted);
  const confirmedClasses = classes.filter(c => !c.waitlisted);

  return (
    <div className="container mx-auto py-10 px-4">
      {waitlistedClasses.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4">{LABELS.memberDash.schedule.waitlistHead}</h1>
          <div className="space-y-4 mb-8">
            {waitlistedClasses.map(item => (
              <EnrolledCard
                key={`${item.class_id}-${item.joined_at}`}
                item={item}
                isWaitlisted
                onCancel={() => onCancel(item)}
              />
            ))}
          </div>
        </>
      )}

      <h1 className="text-xl font-bold mb-4">{LABELS.memberDash.schedule.scheduleHead}</h1>
      {confirmedClasses.length > 0 ? (
        <div className="space-y-4">
          {confirmedClasses.map(item => (
            <EnrolledCard
              key={`${item.class_id}-${item.joined_at}`}
              item={item}
              onCancel={() => onCancel(item)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">{LABELS.memberDash.schedule.noReturns}</p>
      )}
    </div>
  );
}
