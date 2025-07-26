// app/api/classes/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const body = await req.json();

    const { data, error } = await supabase
      .from('Classes')
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
}
