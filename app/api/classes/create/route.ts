// app/api/classes/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const body = await req.json();

    const { data: classes, error } = await supabase
        .from('classes')
        .insert([body])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({message: "Class created successfully", data:classes[0]});
}
