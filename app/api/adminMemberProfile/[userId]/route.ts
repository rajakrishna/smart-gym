// app/api/adminMemberProfile/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const makeInvoiceNumber = (n: number | string) =>
  `INV-${new Date().getFullYear()}-${String(n).padStart(3, "0")}`;
const altStatus = (i: number) => (i % 2 === 0 ? "checked-in" : "checked-out");
const classStatus = (date?: string | null) =>
  date && new Date(date).getTime() < Date.now() ? "completed" : "upcoming";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ userId: string }> }   // 👈 same as your other route
) {
  const { userId } = await ctx.params;           // 👈 await the params
  const supabase = await createClient();

  // member
  const { data: member, error: mErr } = await supabase
    .from("user")
    .select("user_id, first_name, last_name, email, phone, user_image, membership_plan, date_of_birth, created_at")
    .eq("user_id", userId)
    .single();
  if (mErr || !member) {
    return NextResponse.json({ error: mErr?.message ?? "not found" }, { status: 404 });
  }

  // invoices
  const { data: inv } = await supabase
    .from("user_invoice")
    .select("invoice_id, invoice_amount")
    .eq("user_id", userId)
    .order("invoice_id", { ascending: false });

  const invoices = (inv ?? []).map((i) => ({
    id: i.invoice_id,
    invoiceNumber: makeInvoiceNumber(i.invoice_id),
    description: "Monthly Membership Fee",
    status: "paid",
    date: null as string | null, // no column in DB → null
    amount: Number(i.invoice_amount ?? 0),
  }));

  // check-ins
  const { data: ci } = await supabase
    .from("check_ins")
    .select("checkin_id, check_in_time")
    .eq("user_id", userId)
    .order("check_in_time", { ascending: false });

  const checkins = (ci ?? []).map((c, idx) => {
    const dt = new Date(c.check_in_time as string);
    return {
      id: c.checkin_id ?? String(idx),
      status: altStatus(idx),
      date: dt.toISOString().slice(0, 10),
      time: dt.toTimeString().slice(0, 5),
    };
  });

  // classes (manual join)
  const [{ data: bookings }, { data: classes }, { data: coaches }] = await Promise.all([
    supabase.from("class_bookings").select("class_bookings_id, class_id, booking_status").eq("user_id", userId),
    supabase.from("classes").select("class_id, class_name, scheduled_on, time, coach_id"),
    supabase.from("coaches").select("coach_id, first_name, last_name"),
  ]);

  const coachById = new Map((coaches ?? []).map((c) => [c.coach_id, `${c.first_name} ${c.last_name}`]));
  const classById = new Map((classes ?? []).map((c) => [c.class_id, c]));

  const classesTaken = (bookings ?? []).map((b, idx) => {
    const cls = classById.get(b.class_id);
    return {
      id: b.class_bookings_id ?? String(idx),
      status: String(b.booking_status ?? classStatus(cls?.scheduled_on)),
      className: cls?.class_name ?? "—",
      instructor: cls?.coach_id ? (coachById.get(cls.coach_id) ?? "—") : "—",
      date: cls?.scheduled_on ?? null,
      time: (cls?.time as string | undefined)?.slice(0, 5) ?? null,
    };
  });

  return NextResponse.json({ member, invoices, checkins, classes: classesTaken }, { headers: { "Cache-Control": "no-store" } });
}
