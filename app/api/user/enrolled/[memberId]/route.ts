import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  const { memberId } = await params;

  if (!memberId) {
    return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('class_bookings')
      .select('class_id, booking_status, waitlisted, joined_at')
      .eq('user_id', memberId)
      .eq('booking_status', 'confirmed')
      .eq('waitlisted', false);

    const bookings = data ?? [];
    if (error) {
      console.error('Error fetching class bookings:', error);
      return NextResponse.json({ error: 'Failed to fetch enrolled classes' }, { status: 500 });
    }

    const classPromises = bookings.map(async (booking) => {
      const { data: classData, error: classError } = await supabase
        .from('classes')
        .select('class_name, category, scheduled_on, time')
        .eq('class_id', booking.class_id)
        .single();

      if (classError || !classData) return null;
      return { ...booking, class_details: classData };
    });

    const enrolledClasses = (await Promise.all(classPromises)).filter(Boolean);
    return NextResponse.json(enrolledClasses);
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  const { memberId } = await params;

  if (!memberId) {
    return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
  }

  let body: { class_id?: string; joined_at?: string } = {};
  try {
    body = await request.json();
  } catch {
  }

  const { class_id, joined_at } = body;
  if (!class_id) {
    return NextResponse.json({ error: 'class_id is required' }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    let q = supabase
      .from('class_bookings')
      .delete()
      .eq('user_id', memberId)
      .eq('class_id', class_id);

    if (joined_at) q = q.eq('joined_at', joined_at);

    const { data, error } = await q.select('class_id');

    if (error) {
      console.error('Error deleting booking:', error);
      return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted: data.length });
  } catch (error) {
    console.error('Error in DELETE request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
