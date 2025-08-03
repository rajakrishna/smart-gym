import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;

  if (!classId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Class ID is required',
      },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  try {
    const { data: members, error } = await supabase
      .from('class_bookings')
      .select('user_id, booking_status, waitlisted, joined_at')
      .eq('class_id', classId)
      .eq('booking_status', 'confirmed')
      .eq('waitlisted', false);

    if (error) {
      console.error('Error fetching members:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch members',
        },
        { status: 500 }
      );
    }

    const userPromises = members.map(async booking => {
      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('first_name, last_name, email')
        .eq('user_id', booking.user_id)
        .single();

      if (userError) {
        console.error('Error fetching user details:', userError);
        return null;
      }

      return {
        user_id: booking.user_id,
        class_id: classId,
        booking_status: booking.booking_status,
        waitlisted: booking.waitlisted,
        joined_at: booking.joined_at,
        user_details: userData,
      };
    });

    const users = await Promise.all(userPromises);

    const enrolledMembers = Array.from(users.values()).map(user => ({
      id: user!.user_id,
      name: `${user!.user_details.first_name} ${user!.user_details.last_name}`,
      email: user!.user_details.email,
    }));

    return NextResponse.json({
      success: true,
      data: enrolledMembers,
    });
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
