import { NextResponse } from 'next/server';

import { validateMessageData, ValidationMessage } from '@/lib/messageValidation';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    console.log('Starting message creation...');

    const message_body = await request.json();

    console.log('Request body:', message_body);

    const { user_id, type, title, body, category, delivery_method } = message_body;

    const validationErrors: ValidationMessage[] = validateMessageData(message_body);

    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return NextResponse.json({ error: validationErrors[0].message }, { status: 400 });
    }

    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('email')
      .eq('user_id', user_id)
      .single();

    if (userError || !userData) {
      console.log('User lookup error:', userError);
      return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }

    const { email } = userData;
    console.log('Found user email:', email);

    console.log('Inserting message into database...');
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          user_id,
          email,
          type,
          title,
          body,
          sent_at: new Date().toISOString(),
          category,
          delivery_method,
        },
      ])
      .select();

    if (error) {
      console.log('Database insert error:', error);
      return NextResponse.json(
        {
          status: 'error',
          message: error.message || 'Unknown error',
          details: error.details,
          hint: error.hint,
        },
        { status: 500 }
      );
    }

    console.log('Message created successfully:', data[0]);
    return NextResponse.json({ status: 'ok', messages: data[0] }, { status: 201 });
  } catch (error) {
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
