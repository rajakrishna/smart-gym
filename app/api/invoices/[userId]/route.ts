import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { invoiceIdSchema } from '@/lib/zod/invoiceSchema';
import { treeifyError } from 'zod';

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
    try {
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
    } catch (error) {
        return NextResponse.json(
            {
                error: 'unexpected server error',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500}
        );
    }
}
