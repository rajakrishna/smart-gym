import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    console.log('Attempting to fetch messages from database...');

    const { data, error } = await supabase.from('messages').select('*').order('sent_at', { ascending: false });

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return NextResponse.json(
        {
          status: 'error',
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    console.log('Successfully fetched messages:', data?.length || 0, 'records');

    return NextResponse.json({ status: 'ok', messages: data });
  } catch (error) {
    console.error('Unexpected error in getAll messages:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Unexpected server error',
        // Make sure that the error is always a string otherwise it will break the app, if it's not a string it will throw the "Unknown error"
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
