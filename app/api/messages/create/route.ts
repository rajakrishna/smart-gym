import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { validateMessageData, ValidationMessage } from "@/lib/messageValidation";

export async function POST(request: Request) {
    const supabase = await createClient(); 
    const message_body = await request.json();
    
    const {
        user_id, 
        type, 
        title, 
        body, 
        category, 
        delivery_method
    } = message_body;
    
    const validationErrors: ValidationMessage[] = validateMessageData(message_body)
    if (validationErrors.length > 0) {
        return NextResponse.json(
            { error: validationErrors[0].message }, 
            { status: 400 }
        )
    }

    const { data: userData, error: userError } = await supabase
        .from("User")
        .select("full_name, email")
        .eq("user_id", user_id)
        .single();
    
    if (userError || !userData){
        return NextResponse.json(
            { error: "user not found"},
            { status: 404 }
        )
    }

    const { full_name, email } = userData

    const { data, error } = await supabase
        .from('messages')
        .insert([
            {
                user_id, 
                full_name, 
                email, 
                type, 
                title, 
                body, 
                sent_at: new Date().toISOString(), 
                category, 
                delivery_method
            }
        ])
        .select();
    
    if (error) {
        return NextResponse.json(
            {
            status: "error",
            message: error.message || "Unknown error",
            details: error.details,
            hint: error.hint,
            },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { status: 'ok', messages: data[0] },
        { status: 201 }
    );
}