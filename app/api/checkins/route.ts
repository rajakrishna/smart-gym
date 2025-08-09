import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ status: 'error', message: 'missing user_id' }, { status: 400 });
    }
    const { data, error } = await supabase.from('check_ins').select('*').eq('user_id', userId);

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'ok', messages: data });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Unexpected server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
