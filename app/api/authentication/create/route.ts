import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();
  const { user_id, user_name, user_password, role } = body;

  if (!user_id || user_id.trim() === '') {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
  }
  if (!user_name || user_name.trim() === '') {
    return NextResponse.json({ error: 'Missing user_name' }, { status: 400 });
  }
  if (!user_password || user_password.trim() === '') {
    return NextResponse.json({ error: 'Missing user_password' }, { status: 400 });
  }
  if (!role || !['Member', 'Admin'].includes(role.trim())) {
    return NextResponse.json({ error: 'Issue with role_name' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(user_password, 10);
  const { data, error } = await supabase
    .from('auth_table')
    .insert([
      {
        user_id,
        created_at: new Date().toISOString(),
        user_name,
        user_password: hashedPassword,
        role,
      },
    ])
    .select();

  // Insert auth
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ user: data[0] }, { status: 201 });
}
