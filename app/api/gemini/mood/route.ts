import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const ALLOWED = new Set(['very_happy', 'happy', 'neutral', 'sad', 'very_sad']);

// GET mood
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const supabase = await createClient();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    const { data, error } = await supabase
      .from('user_ai_check')
      .select('mood')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('GET /gemini/mood supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ mood: data?.mood ?? null });
  } catch (e: unknown) {
    console.error('GET /gemini/mood handler error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// PATCH mood and update ai_check_in 
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const supabase = await createClient();
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    const body = await req.json().catch(() => ({}));
    const mood: string | undefined = body.mood;
    if (!mood || !ALLOWED.has(mood)) {
      return NextResponse.json({ error: 'Invalid mood' }, { status: 400 });
    }

    const nowISO = new Date().toISOString();

    const { data: updated, error: updateErr } = await supabase
      .from('user_ai_check')
      .update({ mood })
      .eq('user_id', userId)
      .select('user_id')
      .maybeSingle();

    if (updateErr) {
      console.error('PATCH /gemini/mood update error:', updateErr);
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    if (!updated) {
      const { error: insertErr } = await supabase
        .from('user_ai_check')
        .insert({ user_id: userId, mood });

      if (insertErr) {
        console.error('PATCH /gemini/mood insert error:', insertErr);
        return NextResponse.json({ error: insertErr.message }, { status: 500 });
      }
    }

    const { error: checkinErr } = await supabase
      .from('user')
      .update({ ai_check_in: nowISO })
      .eq('user_id', userId);

    if (checkinErr) {
      console.error('PATCH /gemini/mood check-in update error:', checkinErr);
      return NextResponse.json({ error: checkinErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, mood, ai_check_in: nowISO, mode: updated ? 'updated' : 'inserted' });
  } catch (e: unknown) {
    console.error('PATCH /gemini/mood handler error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
