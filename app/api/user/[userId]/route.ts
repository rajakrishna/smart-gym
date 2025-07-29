import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const supabase = await createClient();

  const { data: user, error } = await supabase.from('user').select('*').eq('user_id', userId).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // console.log(user)
  return NextResponse.json(user);
}
