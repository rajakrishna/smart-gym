import { NextRequest, NextResponse } from 'next/server';

import { createClassSchema } from '@/lib/zod/zodSkema';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  const parsed = createClassSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const validatedData = parsed.data;

  const { data: classes, error } = await supabase.from('classes').insert([validatedData]).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Class created successfully', data: classes[0] });
}
