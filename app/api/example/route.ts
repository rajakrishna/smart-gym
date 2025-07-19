import { NextResponse } from 'next/server';

import { ExampleData } from '@/types/shared';

const examples: ExampleData[] = [
  {
    id: '1',
    name: 'Sample Item 1',
    description: 'This is a sample item for demonstration',
  },
  {
    id: '2',
    name: 'Sample Item 2',
    description: 'Another sample item for demonstration',
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: examples,
    });
  } catch (error) {
    console.error('GET /api/example error:', error);
    return NextResponse.json({ success: false, data: [], error: 'Internal server error' }, { status: 500 });
  }
}
