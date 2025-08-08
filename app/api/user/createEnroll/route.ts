import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, class_id, waitlisted=false} = body;
    console.log('Body:',body)

    if (!user_id || !class_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('class_bookings')
      .insert([
        {
          user_id,
          class_id,
          booking_status: 'confirmed',
          waitlisted,
          joined_at: new Date().toISOString()
        },
      ])


    if (error) {
      console.error('Error inserting booking:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, booking: data }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
