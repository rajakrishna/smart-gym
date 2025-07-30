import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();

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
      .order('scheduled_on', { ascending: true });

    if (error) {
      console.error('DB Error:', error.message);
      throw error;
    }

    const categoryImageMap: Record<string, string> = {
      Yoga: '/assets/gc1.png',
      Cycling: '/assets/gc2.png',
      Boxing: '/assets/gc3.png',
      Swimming: '/assets/gc4.png',
      HIIT: '/assets/gc5.png',
    };

    const timeMap: Record<string, string> = {
      Yoga: '7:00 AM',
      HIIT: '8:00 AM',
      Boxing: '9:00 AM',
      Cycling: '6:30 AM',
      Aquatic: '10:00 AM',
      Fitness: '11:00 AM',
      Flexibility: '12:00 PM',
    };
    const transformed = data.map(c => {
      const coach = Array.isArray(c.coach) ? c.coach[0] : c.coach;
      const start = c.start_time ? new Date(c.start_time) : null;

      return {
        class_id: c.class_id,
        category: c.category,
        coach_name: coach ? `${coach.first_name}` : 'Coach TBD',
        time: timeMap[c.category] || 'TBD',
        capacity: c.capacity,
        src: categoryImageMap[c.category] || '/images/gc3.png',
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
