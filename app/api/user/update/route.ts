import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { validateUserData, ValidationMessage } from '@/lib/userInfoValidation';

export async function PATCH(request: Request) {
  const supabase = await createClient();

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' });
  }

  // validate user_id
  const { user_id } = body;
  if (!user_id) {
    return NextResponse.json({ error: 'Missing user_id to identify user' }, { status: 400 });
  }

  const validationErrors: ValidationMessage[] = validateUserData(body);
  if (validationErrors.length > 0) {
    return NextResponse.json({ error: validationErrors[0].message }, { status: 400 });
  }

  // allowed fields for updating
  const allowedFields = [
    'role_name',
    'full_name',
    'first_name',
    'last_name',
    'date_of_birth',
    'address',
    'city',
    'state',
    'zip_code',
    'email',
    'phone',
    'user_image',
    'membership_plan',
    'stripe_customer_id',
  ];

  // build payload
  const updates: Record<string, unknown> = {};

  // validation
  for (const field of allowedFields) {
    if (field in body) {
      updates[field] = body[field];
    } else {
      return NextResponse.json({ error: field + " is not a valid field" }, { status: 400 });
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields provided for update' }, { status: 400 });
  }

  const { data, error } = await supabase.from('User').update(updates).eq('user_id', user_id).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'User could not be found' }, { status: 404 });
  }

  return NextResponse.json({ user: data[0] }, { status: 200 });
}
