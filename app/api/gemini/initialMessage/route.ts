// app/api/gemini/initialMessage/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const userId = '1828034c-85bb-4763-a623-e67c1bedac3d';

  const { data, error } = await supabase
    .from('user') 
    .select('first_name')
    .eq('user_id', userId)
    .single();

  const firstName = error ? 'Friend' : data?.first_name ?? 'Friend';

  return NextResponse.json({
    id: '1',
    content: `Hello ${firstName}! I'm your fitness assistant. I can help you with workout routines, nutrition advice, exercise techniques, and more. What would you like to know?`,
    isUser: false,
    timestamp: new Date().toISOString(),
  });
}
