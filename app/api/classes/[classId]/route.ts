import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request, { params }: { params: { classId: string } }) {
  const supabase = await createClient();
  const { classId } = params;

  const { data: classes, error } = await supabase
    .from('Classes')
    .select('*')
    .eq('class_id', classId)
    .single(); 

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(classes);
}
