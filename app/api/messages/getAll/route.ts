import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase = await createClient(); 
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('sent_at', { ascending: false });
    
    if (error) {
        return NextResponse.json({status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'ok', messages: data });
}