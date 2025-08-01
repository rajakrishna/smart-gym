import { NextResponse } from 'next/server';

import { EnrolledClass } from '@/types/shared';
import { createClient } from '@/utils/supabase/server';

const mockEnrolled: EnrolledClass[] = [
  {
    class_id: '101',
    category: 'Yoga',
    scheduled_on: '2025-08-01',
    start_time: '07:00:00',
    coach_name: 'Sarah Lee',
    coach_id: '123',
    status: 'enrolled',
  },
  {
    class_id: '102',
    category: 'HIIT',
    scheduled_on: '2025-08-02',
    start_time: '08:00:00',
    coach_name: 'James Allen',
    coach_id: '234',
    status: 'waitlisted',
  },
  {
    class_id: '103',
    category: 'Aquatic',
    scheduled_on: '2025-08-03',
    start_time: '18:00:00',
    coach_name: 'Maya Chen',
    coach_id: '987',
    status: 'enrolled',
  },
];

function isValidEnrollment(e: any): e is EnrolledClass {
  return (
    e &&
    typeof e.class_id === 'string' &&
    typeof e.category === 'string' &&
    typeof e.scheduled_on === 'string' &&
    typeof e.start_time === 'string' &&
    typeof e.coach_name === 'string' &&
    (e.status === 'enrolled' || e.status === 'waitlisted')
  );
}

export async function GET() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('class_enrollments').select(`
      class_id,
      status,
      classes:classes!fk_class_bookings_class (
      category,
      scheduled_on,
      start_time,
      coach_id
    )
  `);

    if (error) {
      console.error('DB Error:', error.message);
    }
console.log('Returned class_enrollments data:', data)
const transformed =
  data?.map((item) => {
    const classes = Array.isArray(item.classes) ? item.classes[0] : item.classes;
    const coach_id = classes?.coach_id;

    return {
      class_id: item.class_id,
      category: classes?.category,
      scheduled_on: classes?.scheduled_on,
      start_time: classes?.start_time,
      coach_name: coach_id ?? 'TBD',
      status: item.status,
    };
  }) ?? [];

    const cleaned = transformed.filter(isValidEnrollment);

    // If we get no valid records, return fallback
    const responseData = cleaned.length > 0 ? cleaned : mockEnrolled;

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (err) {
    console.error('GET /api/classes/enrollments error:', err);
    return NextResponse.json(
      {
        success: false,
        data: mockEnrolled,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
