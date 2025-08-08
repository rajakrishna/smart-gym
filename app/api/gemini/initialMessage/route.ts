// app/api/initial-message/route.ts
// SERVER-ONLY: Builds the initial message using Supabase (safe to use next/headers here)

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const userId = '1828034c-85bb-4763-a623-e67c1bedac3d';

  const { data, error } = await supabase
    .from('user') // your table
    .select('first_name')
    .eq('user_id', userId) // your PK column
    .single();

  const firstName = error ? 'Friend' : data?.first_name ?? 'Friend';

  return NextResponse.json({
    id: '1',
    content: `Hello ${firstName}! I'm your fitness assistant. I can help you with workout routines, nutrition advice, exercise techniques, and more. What would you like to know?`,
    isUser: false,
    // Send an ISO string to the client and convert back to Date there
    timestamp: new Date().toISOString(),
  });
}
