import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    console.log('Getting message by message_id');

    const supabase = await createClient();

    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('message_id');

    if (!messageId) {
      return NextResponse.json({ status: 'error', message: 'missing message_id' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('message_id', messageId)
      .order('sent_at', { ascending: false });

    if (error) {
      console.log('Supabase error details:', {
        status: 500,
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

    console.log('Successfully got message by message_id');
    console.log('message:', data[0]);

    return NextResponse.json({ status: 'ok', messages: data });
  } catch (error) {
    console.error('Unexpected error in message creation:', error);
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
