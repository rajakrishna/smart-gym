// src/constants/geminiChatbot.ts
// CLIENT-SAFE: No imports from server-only modules here.

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  mood?: MoodValue;
}

export type MoodValue = 'happy' | 'neutral' | 'tired' | 'sore' | 'motivated';
export type MoodOption = { emoji: string; label: string; value: MoodValue };

// Suggested prompts for users to try
export const SUGGESTED_PROMPTS = [
  'What should I eat after my workout?',
  'Create a beginner workout plan',
  'How many calories should I eat to lose weight?',
  'Best exercises for building muscle',
];

export const MOOD_OPTIONS: MoodOption[] = [
  { emoji: '😀', label: 'Happy', value: 'happy' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '🤕', label: 'Sore', value: 'sore' },
  { emoji: '🔥', label: 'Motivated', value: 'motivated' },
];

// Helper function to create messages
export const createMessage = (
  content: string,
  isUser: boolean,
  mood?: MoodValue
): Message => ({
  id: (Date.now() + Math.random()).toString(),
  content,
  isUser,
  timestamp: new Date(),
  ...(mood ? { mood } : {}),
});
