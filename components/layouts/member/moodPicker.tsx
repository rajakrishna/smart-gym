'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils'; 
import { Button } from '@/components/ui/button';
import LABELS from '@/constants/labels';

type MoodValue = 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';

const MOODS: { value: MoodValue; emoji: string; label: string }[] = [
  { value: 'very_happy', emoji: '😀', label: 'Very Happy' },
  { value: 'happy',     emoji: '🙂', label: 'Happy' },
  { value: 'neutral',   emoji: '😐', label: 'Neutral' },
  { value: 'sad',      emoji: '☹️', label: 'Sad' },
  { value: 'very_sad', emoji: '🤕', label: 'Very Sad' },
];

export default function MoodPicker({ userId }: { userId: string }) {
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
    setSaving(true);
    try {
      const res = await fetch(`/api/gemini/mood?userId=${encodeURIComponent(userId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });
      if (res.ok) setSelected(mood);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{LABELS.moodPicker.moodSelect}</p>
      <div className="flex gap-2 flex-wrap">
        {MOODS.map((m) => (
          <Button
            key={m.value}
            type="button"
            variant={selected === m.value ? 'default' : 'outline'}
            disabled={saving}
            className={cn('h-10 px-3')}
            onClick={() => handlePick(m.value)}
            title={m.label}
          >
            <span className="text-lg" aria-hidden>{m.emoji}</span>
            <span className="ml-2 hidden sm:inline text-sm">{m.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
