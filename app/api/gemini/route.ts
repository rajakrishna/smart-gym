import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/utils/supabase/server';

const FITNESS_ONLY_SYSTEM = `
  You are a friendly and knowledgeable gym assistant and personal trainer.
  ONLY cover fitness and nutrition topics:
  - Nutrition advice and diet plans
  - Workout routines and exercise recommendations
  - Fitness goals and motivation
  - Proper form and exercise techniques
  - Recovery and rest recommendations

  Keep responses helpful, encouraging, and practical.
  Don't return more than 500 words. Finish with a TLDR and a follow-up question.
  `;

export async function POST(req: NextRequest) {
  try {
    const { input, userId } = await req.json();
    const model = process.env.GEMINI_MODEL_TYPE || 'gemini-1.5-pro';

    let moodText = '';
    if (userId) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('user_ai_check')
        .select('mood')
        .eq('user_id', userId)
        .single();

      if (!error && data?.mood) {
        moodText = `\nThe user is currently feeling "${data.mood}". Adjust your advice accordingly.`;
      }
    }

    const { text } = await generateText({
      model: google(model),
      system: FITNESS_ONLY_SYSTEM,
      prompt: `User question: ${input}${moodText}`,
      maxOutputTokens: 500,
      temperature: 0.7,
    });

    return NextResponse.json({ text });
  } catch (err) {
    console.error('AI SDK error:', err);
    return NextResponse.json({ error: 'Error generating content' }, { status: 500 });
  }
}
