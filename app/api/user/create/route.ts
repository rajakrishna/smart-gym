import { NextResponse } from 'next/server';

import { validateUserData, ValidationMessage } from '@/lib/userInfoValidation';
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
    stripe_customer_id,
  } = body;

  // validation
  //   if (!role_name || !['Member', 'Admin'].includes(role_name.trim())) {
  //     return NextResponse.json({ error: 'Issue with role_name' }, { status: 400 });
  //   }
  //   if (!full_name || full_name.trim() === '') {
  //     return NextResponse.json({ error: 'Missing full_name' }, { status: 400 });
  //   }
  //   if (!first_name || first_name.trim() === '') {
  //     return NextResponse.json({ error: 'Missing first_name' }, { status: 400 });
  //   }
  //   if (!last_name || last_name.trim() === '') {
  //     return NextResponse.json({ error: 'Missing last_name' }, { status: 400 });
  //   }
  //   if (!date_of_birth) {
  //     return NextResponse.json({ error: 'Missing date_of_birth' }, { status: 400 });
  //   }
  //   if (!address || address.trim() === '') {
  //     return NextResponse.json({ error: 'Missing address' }, { status: 400 });
  //   }
  //   if (!city || city.trim() === '') {
  //     return NextResponse.json({ error: 'Missing city' }, { status: 400 });
  //   }
  //   if (!state || state.trim() === '') {
  //     return NextResponse.json({ error: 'Missing state' }, { status: 400 });
  //   }
  //   if (!zip_code || parseInt(zip_code) < 10000 || parseInt(zip_code) > 99999) {
  //     return NextResponse.json({ error: 'Invalid zip_code: must be exactly 5 digits' }, { status: 400 });
  //   }
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   if (!email || !emailRegex.test(email)) {
  //     return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  //   }
  //   if (!phone || phone.trim() === '') {
  //     return NextResponse.json({ error: 'Missing phone' }, { status: 400 });
  //   }
  //   if (!user_image || typeof user_image !== 'string') {
  //     return NextResponse.json({ error: 'Missing user_image' }, { status: 400 });
  //   }
  //   try {
  //     new URL(user_image);
  //   } catch {
  //     return NextResponse.json({ error: 'Invalid user_image URL' }, { status: 400 });
  //   }
  //   if (!membership_plan || !['Basic', 'Standard', 'Premium'].includes(membership_plan.trim())) {
  //     return NextResponse.json(
  //       { error: 'Invalid membership_plan: must be Basic, Standard, or Premium' },
  //       { status: 400 }
  //     );
  //   }
  //   if (!stripe_customer_id || stripe_customer_id.trim() === '') {
  //     return NextResponse.json({ error: 'Missing stripe_customer_id' }, { status: 400 });
  //   }
  const validationErrors: ValidationMessage[] = validateUserData(body);
  if (validationErrors.length > 0) {
    return NextResponse.json({ error: validationErrors[0].message }, { status: 400 });
  }

  // Insert new user into Supabase
  const { data, error } = await supabase
    .from('user')
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
