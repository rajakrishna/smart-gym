import { NextResponse } from 'next/server';

// import { createClient } from '@/utils/supabase/server';

const mockEnrolledClassMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  },
  {
    id: '3',
    name: 'Jim Doe',
    email: 'jim.doe@example.com',
  },
  {
    id: '4',
    name: 'Jill Doe',
    email: 'jill.doe@example.com',
  },
  {
    id: '5',
    name: 'Jack Doe',
    email: 'jack.doe@example.com',
  },
  {
    id: '6',
    name: 'Jill Doe',
    email: 'jill.doe@example.com',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get('classId');

  if (!classId) {
    return NextResponse.json({ success: false, data: [], error: 'Class ID is required' }, { status: 400 });
  }

  try {
    // const supabase = await createClient();

    // const { data: enrolledClassMembers, error } = await supabase
    //     .from('EnrolledClassMembers')
    //     .select(`*`)
    //     .eq('classId', classId);

    // if (error) {
    //     return NextResponse.json({ error: error.message }, { status: 500 });
    // }

    return NextResponse.json({
      success: true,
      data: mockEnrolledClassMembers,
    });
  } catch (error) {
    console.error('GET /api/example/[getEnrolledClassMembers] error:', error);
    return NextResponse.json({ success: false, data: [], error: 'Internal server error' }, { status: 500 });
  }
}
