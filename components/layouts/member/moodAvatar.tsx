'use client';

import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import MoodPicker from '@/components/layouts/member/moodPicker';
import LABELS from '@/constants/labels';
import { cn } from '@/lib/utils';

export type MoodValue = 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';

const MOOD_EMOJI: Record<MoodValue, string> = {
  very_happy: '😀',
  happy: '🙂',
  neutral: '😐',
  sad: '☹️',
  very_sad: '🤕',
};

const moodRing = (m?: MoodValue | null) =>
  m === 'very_happy' ? 'ring-green-500' :
  m === 'happy'      ? 'ring-emerald-500' :
  m === 'neutral'    ? 'ring-slate-300' :
  m === 'sad'        ? 'ring-amber-500' :
  m === 'very_sad'   ? 'ring-red-500' :
                       'ring-slate-200';

type Props = {
  userId: string;
  refreshOn?: unknown;
  onMoodChange?: (mood: MoodValue) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function MoodAvatar({
  userId,
  refreshOn,
  onMoodChange,
  size = 'md',
  className,
}: Props) {
  const [mood, setMood] = React.useState<MoodValue | null>(null);
  const [open, setOpen] = React.useState(false);

  const dims =
    size === 'sm' ? { hw: 'h-8 w-8', fs: 'text-lg' } :
    size === 'lg' ? { hw: 'h-12 w-12', fs: 'text-2xl' } :
                    { hw: 'h-10 w-10', fs: 'text-xl' };

  const fetchMood = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/gemini/mood?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' });
      if (!res.ok) return;
      const { mood: m } = await res.json();
      setMood((m ?? null) as MoodValue | null);
    } catch {}
  }, [userId]);

  React.useEffect(() => { fetchMood(); }, [fetchMood]);
  React.useEffect(() => {
    if (typeof refreshOn !== 'undefined') fetchMood();
  }, [refreshOn, fetchMood]);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ userId?: string; mood?: MoodValue }>;
      if (ev.detail?.userId && ev.detail.userId !== userId) return;
      if (ev.detail?.mood) setMood(ev.detail.mood);
    };
    window.addEventListener('mood:updated', handler as EventListener);
    return () => window.removeEventListener('mood:updated', handler as EventListener);
  }, [userId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          title={LABELS?.moodPicker?.changeButton ?? 'Change mood'}
          className={cn(
            'rounded-full focus:outline-none focus-visible:ring-3 focus-visible:ring-offset-2',
            moodRing(mood),
            className
          )}
        >
          <span className={cn(
            'inline-flex items-center justify-center rounded-full ring-2 ring-offset-2 bg-muted',
            dims.hw
          )}>
            <span className={cn('leading-none', dims.fs)}>
              {mood ? MOOD_EMOJI[mood] : 'AI'}
            </span>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" side="bottom" className="w-auto p-2">
        <MoodPicker
          userId={userId}
          compact
          onSaved={(m) => {
            setMood(m);
            setOpen(false);
            onMoodChange?.(m);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
