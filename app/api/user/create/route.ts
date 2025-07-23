import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();
  const {
    role_name,
    full_name,
    first_name,
    last_name,
    date_of_birth,
    address,
    city,
    state,
    zip_code,
    email,
    phone,
    user_image,
    membership_plan,
    stripe_customer_id
  } = body;

  // validation
  if (!role_name || role_name.trim() === '') {
    return NextResponse.json({ error: 'Missing role_name' }, { status: 400 });
  }
  if (!full_name || full_name.trim() === '') {
    return NextResponse.json({ error: 'Missing full_name' }, { status: 400 });
  }
  if (!first_name || first_name.trim() === '') {
    return NextResponse.json({ error: 'Missing first_name' }, { status: 400 });
  }
  if (!last_name || last_name.trim() === '') {
    return NextResponse.json({ error: 'Missing last_name' }, { status: 400 });
  }
  if (!date_of_birth) {
    return NextResponse.json({ error: 'Missing date_of_birth' }, { status: 400 });
  }
  if (!address || address.trim() === '') {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 });
  }
  if (!city || city.trim() === '') {
    return NextResponse.json({ error: 'Missing city' }, { status: 400 });
  }
  if (!state || state.trim() === '') {
    return NextResponse.json({ error: 'Missing state' }, { status: 400 });
  }
  if (!zip_code || zip_code.trim() === '') {
    return NextResponse.json({ error: 'Missing zip_code' }, { status: 400 });
  }
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!phone || phone.trim() === '') {
    return NextResponse.json({ error: 'Missing phone' }, { status: 400 });
  }
  if (!user_image || typeof user_image !== 'string') {
    return NextResponse.json({ error: 'Missing user_image' }, { status: 400 });
  }
  try {
    new URL(user_image);
  } catch {
    return NextResponse.json({ error: 'Invalid user_image URL' }, { status: 400 });
  }
  if (!membership_plan || membership_plan.trim() === '') {
    return NextResponse.json({ error: 'Missing membership_plan' }, { status: 400 });
  }
  if (!stripe_customer_id || stripe_customer_id.trim() === '') {
    return NextResponse.json({ error: 'Missing stripe_customer_id' }, { status: 400 });
  }

  // Insert new user into Supabase
  const { data, error } = await supabase
    .from('User')
    .insert([
      {
        role_name,
        full_name,
        first_name,
        last_name,
        date_of_birth,
        address,
        city,
        state,
        zip_code,
        email,
        phone,
        user_image,
        membership_plan,
        stripe_customer_id,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  // Insert user
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ user: data[0] }, { status: 201 });
}
