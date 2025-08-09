'use client';

import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
        const res = await fetch(`/api/checkins/aiCheckin?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' });
        if (!res.ok) return;
        const { lastCheckIn } = await res.json();
        if (isOlderThanTodayLocal(lastCheckIn)) setOpen(true);
      } catch {}
    })();
  }, [userId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader><DialogTitle>Daily AI Check-In</DialogTitle></DialogHeader>
        <p className="text-sm text-muted-foreground">You haven’t completed today’s check-in yet. Do you want to do it now?</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Later</Button>
          <Button onClick={() => (window.location.href = '/member/check-in')}>Check in now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
