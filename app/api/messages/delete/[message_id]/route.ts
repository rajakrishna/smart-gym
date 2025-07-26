import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
    request: Request,
    { params }: { params: {message_id: string}}
) {
    const supabase = await createClient(); 
    const messageId = params.message_id;

    if (!messageId) {
        return NextResponse.json(
            { status: "error", message: "missing message_id" }, 
            { status: 400 }
        );
    }    

    const { data, error } = await supabase
        .from('messages')
        .delete()
        .eq("message_id", messageId)
        .select();
        
    if (error) {
        return NextResponse.json(
            {status: 'error', message: error.message }, 
            { status: 500 }
        );
    }

    return NextResponse.json({ status: 'ok', messages: data });
}
