import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user')             
    .select('ai_check_in')      
    .eq('user_id', userId) 
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const lastCheckInISO = data?.ai_check_in ? new Date(data.ai_check_in).toISOString() : null;

  return NextResponse.json({ lastCheckIn: lastCheckInISO });
}

// http://localhost:3000/api/checkins/aiCheckin?userId=1828034c-85bb-4763-a623-e67c1bedac3d
