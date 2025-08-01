import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const supabase = await createClient(); 

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("user_id")

    if (!userId) {
        return NextResponse.json(
            { status: "error", message: "missing user_id" }, 
            { status: 400 }
        );
    }    

    const { data, error } = await supabase
        .from('check_ins')
        .select('*')
        .eq("user_id", userId)
    
    if (error) {
        return NextResponse.json(
            {status: 'error', message: error.message }, 
            { status: 500 }
        );
    }

    return NextResponse.json({ status: 'ok', messages: data });
}