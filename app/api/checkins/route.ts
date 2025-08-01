import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    console.log('Starting check-in fetch...');

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      console.log('Missing user_id in query params');
      return NextResponse.json({ status: 'error', message: 'missing user_id' }, { status: 400 });
    }

    console.log(`Fetching check-ins for user_id: ${userId}`);

    const { data, error } = await supabase.from('check_ins').select('*').eq('user_id', userId);

    if (error) {
      console.log('supabase query error: ', error);
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }

    console.log(userId, ' checkin data: ', data);
    return NextResponse.json({ status: 'ok', messages: data });
  } catch (error) {
    console.error('Unexpected server error:', error);
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
