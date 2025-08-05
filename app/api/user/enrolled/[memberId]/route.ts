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
    const { data: bookings, error } = await supabase
      .from('class_bookings')
      .select('class_id, booking_status, waitlisted, joined_at')
      .eq('user_id', memberId)
      .eq('booking_status', 'confirmed')
      .eq('waitlisted', false);

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

      if (classError) {
        console.error('Error fetching class details:', classError);
        return null;
      }

      return {
        ...booking,
        class_details: classData,
      };
    });

    const enrolledClasses = await Promise.all(classPromises);

    return NextResponse.json(enrolledClasses.filter(Boolean));
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
