// components/dashboard/moodSelector.tsx
'use client';

import { MOOD_OPTIONS, type MoodValue } from '@/constants/geminiChatbot';

type Props = {
  value: MoodValue | null;
  onChange: (mood: MoodValue) => void;
};

export default function MoodSelector({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      {MOOD_OPTIONS.map((m) => {
        const selected = value === m.value;
        return (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange(m.value)}
            className={`text-2xl p-2 rounded-lg transition
              ${selected ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-gray-100 hover:bg-gray-200'}
            `}
            aria-pressed={selected}
            aria-label={m.label}
            title={m.label}
          >
            {m.emoji}
          </button>
        );
      })}
    </div>
  );
}
