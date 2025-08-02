import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const allowedCategories = [
    'yoga',
    'Yoga',
    'cycling',
    'Cycling',
    'boxing',
    'Boxing',
    'aquatic',
    'Aquatic',
    'hiit',
    'HIIT',
    'Hitt',
  ];
  console.log('Received date query param', date);
  try {
    let query = supabase
      .from('classes')
      .select(
        `
        class_id,
        coach_id,
        class_name,
        category,
        scheduled_on,
        time,
        capacity,
        created_at,
        coach:coaches (
            coach_id,
            first_name,
            last_name
                )
      `
      )
      .in('category', allowedCategories);

    if (date) {
      query = query.eq('scheduled_on', date);
    }

    query = query.order('time', { ascending: true });

    const { data, error } = await query;

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
      const categoryKey = c.category.toLowerCase();
      function formatTimeString(timeString: string): string {
        const [hours, minutes] = timeString.split(':').map(Number);

        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);

        return date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
      }

      return {
        class_id: c.class_id,
        category: c.category,
        coach_name: coach ? `${coach.first_name}` : 'Coach TBD',
        time: formatTimeString(c.time),
        capacity: c.capacity,
        src: categoryImageMap[categoryKey] || '/assets/gc3.png',
      };
    });

    return NextResponse.json({
      success: true,
      data: transformed,
    });
  } catch (err) {
    console.error('GET /api/classes/memberdash error:', err);
    return NextResponse.json({ success: false, data: [], error: 'Internal server error' }, { status: 500 });
  }
}
