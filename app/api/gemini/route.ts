export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/utils/supabase/server';
import { recommendClasses } from '@/constants/upcomingClasses';

const CORE_INVARIANTS = `
You are a friendly, knowledgeable gym assistant and personal trainer.

Scope (MUST follow):
- Fitness & nutrition only (workouts, programming, form cues, recovery, basic nutrition).
- Politely refuse anything outside scope.
- Keep your responses helpful, encouraging, and practical. 
- Always prioritize safety and remind users to consult healthcare professionals for medical concerns. 
- Finish with a TLDR, and a question to help the user continue the conversation.

Coaching constraints:
- Advice must be actionable and scalable (beginner→advanced variants).
- Do not exceed ~500 words total.
`.trim();

const STYLE_BASE = `
Default tone:
- Neutral, concise, supportive.
- Avoid hype, keep it practical.
- No emojis unless mood rules explicitly allow them.
`.trim();

const RESPONSE_FORMAT = `
Response format (follow this order):
- Use double line breaks between paragraphs for proper spacing
- Structure your response with clear paragraphs
- Use bullet points or numbered lists when appropriate
- Each paragraph should contain 2-4 sentences maximum
`.trim();

/** Mood → acknowledgement + tone-only style */
const MOOD_GUIDE: Record<string, { ack: string; style: string }> = {
  very_happy: {
    ack: `You're feeling very happy and energized.`,
    style: `Tone: high-energy, celebratory, motivating. Use at most TWO upbeat emojis in the opener (e.g., 🎉💪). Offer an optional "push" variant. Keep sentences lively, not preachy.`,
  },
  happy: {
    ack: `You're feeling happy and upbeat.`,
    style: `Tone: warm and confident. ONE emoji allowed in the opener (e.g., 🙂). Provide a solid plan with an optional progression.`,
  },
  neutral: {
    ack: `You're feeling neutral.`,
    style: `Tone: clear, matter-of-fact. No emojis. Get to the point with short paragraphs and bullets.`,
  },
  sad: {
    ack: `You're feeling a bit down—thanks for checking in.`,
    style: `Tone: gentle and non-judgmental. No emojis or exclamations. Offer a low-friction plan (5–10 minutes) plus a "do less" fallback. Emphasize small wins and recovery.`,
  },
  very_sad: {
    ack: `You're feeling very low—thanks for checking in.`,
    style: `Tone: very gentle and validating. No emojis or exclamations. Suggest ultra-low-friction steps (e.g., 3–5 min walk, light mobility). One tiny nutrition win. Encourage self-compassion; no pressure.`,
  },
};

function buildSystem(moodCode?: string | null) {
  const mood = moodCode && MOOD_GUIDE[moodCode];

  const PRIORITY = `
Instruction priority (highest→lowest):
1) CORE_INVARIANTS
2) RESPONSE_FORMAT
3) STYLE_BASE
4) MOOD_STYLE (tone & pacing ONLY; do not change exercise/nutrition logic more than one step)

If any conflict occurs, prefer higher-priority instructions.
`.trim();

  const MOOD_STYLE = mood
    ? `
MAY ACKNOWLEDGE MOOD:
- First sentence should briefly acknowledge: "${mood.ack}"

MOOD_STYLE (tone only):
${mood.style}

Difficulty adjustment rule:
- You may adjust difficulty ONE step up or down (e.g., +/- one set or ~30% time) to match mood, but keep the plan fundamentally similar.
`.trim()
    : `MOOD_STYLE: none provided. Use STYLE_BASE.`;

  return [CORE_INVARIANTS, PRIORITY, STYLE_BASE, MOOD_STYLE, RESPONSE_FORMAT].join('\n\n');
}

export async function POST(req: NextRequest) {
  try {
    const { input, userId } = await req.json();
    if (!input || typeof input !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid "input"' }, { status: 400 });
    }

    let moodCode: string | null = null;
    if (userId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from('user_ai_check')
        .select('mood')
        .eq('user_id', userId)
        .maybeSingle();
      moodCode = data?.mood ?? null;
    }

    // Get recommendations from the class module
    const { lines: recLines, wants } = recommendClasses(input, moodCode, 3);
    const recBlock = recLines.length
      ? `\n\nRECOMMENDED_UPCOMING_CLASSES (top matches):\n${recLines.join('\n')}\n\nIf helpful, suggest one specifically and explain why. Otherwise, ignore.`
      : '';

    const system = buildSystem(moodCode);

    const { text } = await generateText({
      model: google(process.env.GEMINI_MODEL_TYPE || 'gemini-1.5-flash'),
      system,
      prompt: `User question:\n${input}${recBlock}`.trim(),
      maxOutputTokens: 500,
      temperature: 0.7,
    });

    const payload: any = { text };

    return NextResponse.json(payload);
  } catch (err: any) {
    console.error('AI SDK error:', err);
    return NextResponse.json(
      { error: 'Error generating content', details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
