// app/api/gemini-assistant/route.ts
// https://aistudio.google.com/apikey - GET YOUR API KEY FROM HERE
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

// Optional: narrow to known moods so you don't pass arbitrary strings
type MoodValue = 'happy' | 'neutral' | 'tired' | 'sore' | 'motivated';

function normalizeMood(mood: unknown): MoodValue | null {
  if (typeof mood !== 'string') return null;
  const v = mood.toLowerCase();
  const allowed: MoodValue[] = ['happy', 'neutral', 'tired', 'sore', 'motivated'];
  return (allowed as string[]).includes(v) ? (v as MoodValue) : null;
}

export async function POST(req: NextRequest) {
  try {
    const { input, mood } = await req.json();

    if (!input || typeof input !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const modelType = process.env.GEMINI_MODEL_TYPE || 'gemini-2.5-flash-lite';
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY missing' }, { status: 500 });
    }

    const moodNorm = normalizeMood(mood);
    const moodLine = moodNorm
      ? `User reported mood: ${moodNorm}. Adjust advice accordingly (e.g., scale intensity, volume, and recovery).`
      : `No mood provided. Use standard guidance.`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelType });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
${moodLine}

You are a friendly and knowledgeable **gym assistant and personal trainer**. You are ONLY allowed to answer questions related to:

- Workout routines and exercise recommendations  
- Nutrition advice and meal planning  
- Fitness goals and motivation  
- Proper form and exercise techniques  
- Recovery and rest recommendations  

If a question is outside health/fitness/wellness, politely decline and ask for a fitness-related question.

Tone:
- Encouraging, supportive, and practical  
- Clear and easy to understand  
- Respectful and motivational  

ALWAYS prioritize safety. Remind users to consult healthcare professionals for medical conditions or injuries.

Formatting rules:  
- Use double line breaks between paragraphs  
- Clear paragraphs (2–4 sentences each)  
- Use bullet points or numbered lists when appropriate  
- Max 500 words  

End every response with:  
- A short TL;DR  
- A follow-up question to continue the conversation

User question: ${input}
              `.trim(),
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const text = result.response.text();
    return NextResponse.json({ text, mood: moodNorm });
  } catch (error: any) {
    console.error('Error generating content:', error?.message || error);
    const status = error?.response?.status || 500;
    return NextResponse.json({ error: 'Error generating content' }, { status });
  }
}
