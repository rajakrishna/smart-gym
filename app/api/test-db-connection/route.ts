import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json(
            {status: 'error', message: 'missing environment variables'},
            {status: 500}
        );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
        .from('User')
        .select('*', {count: 'exact', head: true });

    if (error) {
        return NextResponse.json(
            { status: 'error', message: 'supabase connection failed: ${error.message}' },
            {status: 500}
        )
    }

    return NextResponse.json({
        status: 'ok',
        message: 'you are connected to the smart gym supabase db!'
    })
}

