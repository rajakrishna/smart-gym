'use client';

import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LABELS from '@/constants/labels';

function isOlderThanTodayLocal(isoOrNull: string | null) {
  if (!isoOrNull) return true;
  const last = new Date(isoOrNull);
  const start = new Date(); start.setHours(0,0,0,0);
  return last < start;
}

export default function ClientCheckinNotice({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      try {
        const res = await fetch(`/api/gemini/aiCheckin?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' });
        if (!res.ok) return;
        const { lastCheckIn } = await res.json();
        if (isOlderThanTodayLocal(lastCheckIn)) setOpen(true);
      } catch {}
    })();
  }, [userId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader><DialogTitle>{LABELS.clientAiCheckinNotice.title}</DialogTitle></DialogHeader>
        <p className="text-sm text-muted-foreground">{LABELS.clientAiCheckinNotice.description}</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>{LABELS.clientAiCheckinNotice.later}</Button>
          <Button onClick={() => (window.location.href = '/member/check-in')}>{LABELS.clientAiCheckinNotice.checkInNow}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
