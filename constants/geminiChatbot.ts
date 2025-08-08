interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  mood?: MoodValue;
}

type MoodValue = 'happy' | 'neutral' | 'tired' | 'sore' | 'motivated';

type MoodOption = { emoji: string; label: string; value: MoodValue };
// Initial message for the chat
const INITIAL_MESSAGE: Message = {
  id: '1',
  content:
    "Hello! I'm your fitness assistant. I can help you with workout routines, nutrition advice, exercise techniques, and more. What would you like to know?",
  isUser: false,
  timestamp: new Date(),
};

// Suggested prompts for users to try
const SUGGESTED_PROMPTS = [
  'What should I eat after my workout?',
  'Create a beginner workout plan',
  'How many calories should I eat to lose weight?',
  'Best exercises for building muscle',
];

const MOOD_OPTIONS: MoodOption[] = [
  { emoji: '😀', label: 'Happy', value: 'happy' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '🤕', label: 'Sore', value: 'sore' },
  { emoji: '🔥', label: 'Motivated', value: 'motivated' },
];

// Helper function to create messages
const createMessage = (
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

export { INITIAL_MESSAGE, SUGGESTED_PROMPTS, createMessage, MOOD_OPTIONS };
export type { Message, MoodOption, MoodValue };
