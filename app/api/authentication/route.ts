import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { userId, password } = await request.json();

    if (!userId || !password) {
      return NextResponse.json({ error: 'Missing user_id or password' }, { status: 400 });
    }


    const supabase = await createClient();

    const { data: user, error } = await supabase.from('auth_table').select('*').eq('user_id', userId).single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Authentication successful', userId: user.id });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
