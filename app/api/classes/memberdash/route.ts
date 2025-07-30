import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const allowedCategories = ['yoga', 'cycling', 'boxing', 'aquatic', 'hiit'];

  try {
    const { data, error } = await supabase
      .from('classes')
      .select(
        `
        class_id,
        coach_id,
        class_name,
        category,
        scheduled_on,
        start_time,
        end_time,
        capacity,
        created_at,
        coach:coaches (
            coach_id,
            first_name,
            last_name
                )
      `
      )
      .in('category', allowedCategories)
      .order('start_time', { ascending: true });

    if (error) {
      console.error('DB Error:', error.message);
      throw error;
    }

    const categoryImageMap: Record<string, string> = {
      yoga: '/assets/gc1.png',
      cycling: '/assets/gc2.png',
      boxing: '/assets/gc3.png',
      aquatic: '/assets/gc4.png',
      hiit: '/assets/gc5.png',
    };

    const transformed = data.map(c => {
      const coach = Array.isArray(c.coach) ? c.coach[0] : c.coach;
      function formatTime(timeString: string) {
        const date = new Date(`1970-01-01T${timeString}Z`);
        return date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'UTC',
        });
      }

      return {
        class_id: c.class_id,
        category: c.category,
        coach_name: coach ? `${coach.first_name}` : 'Coach TBD',
        time: formatTime(c.start_time),
        capacity: c.capacity,
        src: categoryImageMap[c.category] || '/assets/gc3.png',
      };
    });

    return NextResponse.json({
      success: true,
      data: transformed,
    });
  } catch (err) {
    console.error('GET /api/classes/with-coach error:', err);
    return NextResponse.json({ success: false, data: [], error: 'Internal server error' }, { status: 500 });
  }
}
