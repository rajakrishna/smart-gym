// app/api/classes/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function DELETE(req: NextRequest) {
    const supabase = await createClient();
    const body = await req.json();
    const { class_id } = body;

    if (!class_id) {
      return NextResponse.json({ error: "Missing class_id" }, { status: 400 });
    }

    const { data: classes, error } = await supabase
        .from('classes')
        .delete()
        .eq('class_id', class_id)
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Class deleted successfully", data:classes[0] });
}
