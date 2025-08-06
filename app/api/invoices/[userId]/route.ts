import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { invoiceIdSchema } from '@/lib/zod/invoiceSchema';
import { treeifyError } from 'zod';

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {

  const { userId } = await Promise.resolve(context.params);

  const parsed = invoiceIdSchema.safeParse({ user_id: userId });

  if (!parsed.success) {
    const structuredError = treeifyError(parsed.error);
    return NextResponse.json(
      {
        error: 'invalid user id',
        details: structuredError,
      },
      { status: 400 }
    );
  }

  const { user_id } = parsed.data;

  const supabase = await createClient();
  const { data: invoices, error } = await supabase
    .from('user_invoice')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(invoices);
}
