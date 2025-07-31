import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    console.log('Attempting to fetch users from database...');

    const supabase = await createClient();

    const { data: users, error } = await supabase.from('user').select();

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

    console.log('Successfully fetched users:', users?.length || 0, 'records');
    console.log('users', users);

    return NextResponse.json({ status: 'ok', users: users });
  } catch (error) {
    console.error('Error in getAll users:', error);
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
