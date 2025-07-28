import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    const supabase = await createClient();

    const { data: classes, error } = await supabase
        .from('Classes')
        .select(`
        *,
        Coaches (
            full_name
        )
        `)
        .order('scheduled_on', { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(classes);
}

