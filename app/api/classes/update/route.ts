import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function PATCH(req: Request) {
    const supabase = await createClient();
    const body = await req.json();
    const { class_id, ...updateFields } = body;

    if (!class_id) {
        return NextResponse.json({ error: 'Missing class_id in request body' }, { status: 400 });
    }

    const { error } = await supabase
        .from('classes')
        .update(updateFields)
        .eq('class_id', class_id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Class updated'});
}


