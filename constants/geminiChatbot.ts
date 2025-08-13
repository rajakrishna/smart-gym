// src/constants/geminiChatbot.ts
// CLIENT-SAFE: No imports from server-only modules here.

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Suggested prompts for users to try
export const SUGGESTED_PROMPTS = [
  'What should I eat after my workout?',
  'Create a beginner workout plan',
  'How many calories should I eat to lose weight?',
  'Best exercises for building muscle',
];


// Helper function to create messages
export const createMessage = (
  content: string,
  isUser: boolean
): Message => ({
  id: (Date.now() + Math.random()).toString(),
  content,
  isUser,
  timestamp: new Date()
});
