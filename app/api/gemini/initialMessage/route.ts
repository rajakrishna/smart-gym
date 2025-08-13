import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const userId = '1828034c-85bb-4763-a623-e67c1bedac3d';

  // Fetch first_name and mood in parallel
  const [
    { data: userData, error: userError },
    { data: moodData, error: moodError },
  ] = await Promise.all([
    supabase.from('user').select('first_name').eq('user_id', userId).single(),
    supabase.from('user_ai_check').select('mood').eq('user_id', userId).maybeSingle(),
  ]);

  const firstName = userError ? 'Friend' : userData?.first_name ?? 'Friend';
  const rawMood = moodError ? null : moodData?.mood ?? null;

  const mood = rawMood
    ? String(rawMood).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : null;

  const moodLine = mood
    ? `\n\nI’ll keep in mind you’re feeling **${mood}** (can click on emoji to edit) today and adjust suggestions accordingly.`
    : '';

  return NextResponse.json({
    id: '1',
    content:
      `Hello ${firstName}! I'm your fitness assistant. I can help you with workout routines, exercise techniques, motivation, and recovery. What would you like to know?` +
      moodLine,
    isUser: false,
    timestamp: new Date().toISOString(),
  });
}
