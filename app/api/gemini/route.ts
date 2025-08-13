import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@/utils/supabase/server';

const CORE_INVARIANTS = `
You are a friendly, knowledgeable gym assistant and personal trainer.

Scope (MUST follow):
- Fitness & nutrition only (workouts, programming, form cues, recovery, basic nutrition).
- Politely refuse anything outside scope.

Safety:
- No diagnosis or medical claims.
- Suggest seeing a professional for pain/injury/red flags.

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
1) Opener (1–2 sentences; may acknowledge mood)
2) Workout plan (bulleted, sets × reps or time; include easy/progression options)
3) Nutrition tip(s) (1–2 bullets)
4) Recovery note (1 bullet)
5) TL;DR (one line)
6) Follow-up question (one line)
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
MUST ACKNOWLEDGE MOOD:
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

    const modelName = process.env.GEMINI_MODEL_TYPE || 'gemini-1.5-flash';

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

    const system = buildSystem(moodCode);

    const { text } = await generateText({
      model: google(modelName),
      system,
      prompt: `User question:\n${input}`.trim(),
      maxOutputTokens: 500,
      temperature: 0.4, 
    });

    return NextResponse.json({ text });
  } catch (err) {
    console.error('AI SDK error:', err);
    return NextResponse.json({ error: 'Error generating content' }, { status: 500 });
  }
}
