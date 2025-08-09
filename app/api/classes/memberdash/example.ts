import { NextRequest,NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    let query = supabase
        .from('classes')
        .select(`
            *,
            coaches (
            first_name,
            last_name
            )
        `)
        .order('scheduled_on', { ascending: true });

    if (date) {
        query = query.eq('scheduled_on', date);
    }

    const { data: classes, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(classes);
}