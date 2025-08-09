// app/api/profile/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { invoiceIdSchema } from "@/lib/zod/invoiceSchema";

interface ClassInfo {
  class_name: string | null;
  category: string | null;
  scheduled_on: string | null;
}
type ClassJoined = ClassInfo | ClassInfo[] | null;
interface ClassBookingRow { classes: ClassJoined; }
const normalize = (c: ClassJoined): ClassInfo | null => Array.isArray(c) ? (c[0] ?? null) : c;

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ userId: string }> } // 👈 params is a Promise now
) {
  try {
    const { userId } = await ctx.params; // 👈 await it

    // validate userId with your schema
    const parsed = invoiceIdSchema.safeParse({ user_id: userId });
    if (!parsed.success) {
      return NextResponse.json(
        { status: "error", message: "invalid user id", issues: parsed.error.issues },
        { status: 400 }
      );
    }
    const { user_id } = parsed.data;

    const supabase = await createClient();

    const [details, invoices, checkins, classes] = await Promise.all([
      supabase
        .from("user")
        .select("first_name,last_name,email,date_of_birth,address,city,state,zip_code")
        .eq("user_id", user_id)
        .single(),
      supabase.from("user_invoice").select("invoice_id,invoice_amount").eq("user_id", user_id),
      supabase.from("check_ins").select("check_in_time").eq("user_id", user_id),
      supabase
        .from("class_bookings")
        .select(`
          classes:class_id (
            class_name,
            category,
            scheduled_on
          )
        `)
        .eq("user_id", user_id)
        .eq("waitlisted", false)
        .order("scheduled_on", { ascending: false, foreignTable: "classes" }),
    ]);

    const firstError = details.error || invoices.error || checkins.error || classes.error;
    if (firstError) {
      return NextResponse.json({ status: "error", message: firstError.message }, { status: 500 });
    }
    if (!details.data) {
      return NextResponse.json({ status: "error", message: "member not found" }, { status: 404 });
    }

    const d = details.data as {
      first_name: string;
      last_name: string;
      email: string;
      date_of_birth: string | null;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      zip_code?: string | null;
    };

    // normalize classes (array or single)
    const classesRows = (classes.data ?? []) as ClassBookingRow[];
    const memberClassHistory = classesRows.map((row) => {
      const cls = normalize(row.classes);
      return {
        class_name: cls?.class_name ?? "",
        category: cls?.category ?? "",
        scheduled_on: cls?.scheduled_on ?? "",
      };
    });

    return NextResponse.json({
      status: "ok",
      data: {
        memberDetails: {
          first_name: d.first_name,
          last_name: d.last_name,
          email: d.email,
          dob: String(d.date_of_birth ?? ""),
          address: d.address ?? "",
          city: d.city ?? "",
          state: d.state ?? "",
          zip_code: d.zip_code ?? "",
        },
        memberInvoices: (invoices.data ?? []).map((i) => ({
          invoice_id: String(i.invoice_id),
          invoice_amount: String(i.invoice_amount),
        })),
        memberCheckins: (checkins.data ?? []).map((c) => ({
          check_in_time: String(c.check_in_time),
        })),
        memberClassHistory,
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        status: "error",
        message: "unexpected server error",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
