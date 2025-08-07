import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { invoiceIdSchema } from '@/lib/zod/invoiceSchema';
import { treeifyError } from 'zod';

export async function GET(
  req: NextRequest,
  context: unknown
) {
  try {
    const { userId } = (context as { params: { userId: string } }).params;

    const parsed = invoiceIdSchema.safeParse({ user_id: userId });
    if (!parsed.success) {
      const structuredError = treeifyError(parsed.error);
      return NextResponse.json(
        { error: 'invalid user id', details: structuredError },
        { status: 400 }
      );
    }

    const { user_id } = parsed.data;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_invoice')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      return NextResponse.json(
        { error: 'supabase error', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: 'unexpected server error', details: (err as Error).message },
      { status: 500 }
    );
  }
}
