'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import LABELS from '@/constants/labels';

type MoodValue = 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';

const MOODS: { value: MoodValue; emoji: string; label: string }[] = [
  { value: 'very_happy', emoji: '😀', label: 'Very Happy' },
  { value: 'happy',      emoji: '🙂', label: 'Happy' },
  { value: 'neutral',    emoji: '😐', label: 'Neutral' },
  { value: 'sad',        emoji: '☹️', label: 'Sad' },
  { value: 'very_sad',   emoji: '🤕', label: 'Very Sad' },
];

export default function MoodPicker({
  userId,
  onSaved,
  compact = true,
  className,
}: {
  userId: string;
  onSaved?: (mood: MoodValue) => void;
  compact?: boolean;
  className?: string;
}) {
  const [selected, setSelected] = useState<MoodValue | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/gemini/mood?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' });
        const json = await res.json();
        if (res.ok && json.mood) setSelected(json.mood as MoodValue);
      } catch {}
    })();
  }, [userId]);

  const handlePick = async (mood: MoodValue) => {
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/gemini/mood?userId=${encodeURIComponent(userId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });
      if (!res.ok) throw new Error('Failed to save mood');
      setSelected(mood);
      toast.success(LABELS.moodPicker.savedTitle ?? 'Mood saved ✅', { duration: 1000 });
      onSaved?.(mood); 
      window.dispatchEvent(new CustomEvent('mood:updated', { detail: { userId, mood } }));
    } catch {
      toast.error(LABELS.moodPicker.errorTitle ?? 'Could not save', {
        description: LABELS.moodPicker.errorDescription ?? 'Please try again.',
        duration: 1400,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        compact ? 'gap-2' : 'gap-3',
        className
      )}
    >
      {!compact && (
        <p className="text-lg font-medium">{LABELS.moodPicker.moodSelect}</p>
      )}
      <div
        className={cn(
          'flex flex-wrap items-center justify-center',
          compact ? 'gap-2' : 'gap-3'
        )}
        role="radiogroup"
        aria-label={LABELS.moodPicker.ariaGroup ?? 'Select your mood'}
      >
        {MOODS.map((m) => {
          const isActive = selected === m.value;
          return (
            <Button
              key={m.value}
              type="button"
              variant={isActive ? 'default' : 'outline'}
              disabled={saving}
              className={cn(
                'h-9 px-3 border transition-colors rounded-full',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive active:bg-destructive'
              )}
              onClick={() => handlePick(m.value)}
              title={m.label}
              aria-pressed={isActive}
              aria-label={m.label}
            >
              <span className={cn('leading-none', compact ? 'text-xl' : 'text-2xl')} aria-hidden>
                {m.emoji}
              </span>
              {!compact && <span className="ml-2 text-sm">{m.label}</span>}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
