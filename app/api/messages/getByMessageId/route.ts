import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
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
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok', messages: data });
}
