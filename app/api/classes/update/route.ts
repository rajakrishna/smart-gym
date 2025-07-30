import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { updateClassSchema } from '@/lib/zodSkema'; 

export async function PATCH(req: Request) {
    const supabase = await createClient();
    const body = await req.json();
    
    const parsed = updateClassSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 }
        );
    }

    const { class_id, ...updateFields } = parsed.data;

    if (!class_id) {
        return NextResponse.json({ error: 'Missing class_id in request body' }, { status: 400 });
    }

    const { data:classes, error } = await supabase
        .from('classes')
        .update(updateFields)
        .eq('class_id', class_id)
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Class updated', data: classes[0]});
}


