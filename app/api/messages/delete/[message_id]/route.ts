import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  // https://nextjs.org/docs/messages/sync-dynamic-apis
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/URL 
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  const message_id = segments[segments.length - 1];

  if (!message_id) {
    return NextResponse.json(
      { status: "error", message: "Missing message_id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("messages")
    .delete()
    .eq("message_id", message_id)
    .select();

  if (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: "ok", message: data[0] });
}
