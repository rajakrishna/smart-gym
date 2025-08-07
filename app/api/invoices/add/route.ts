import { 
    NextRequest, 
    NextResponse 
} from 'next/server';
import { invoiceSchema } from '@/lib/zod/invoiceSchema';
import { createClient } from '@/utils/supabase/server';
import { treeifyError } from 'zod'

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
        { error: 'invalid JSON' }, 
        { status: 400 }
    );
  }

  const parsed = invoiceSchema.safeParse(body);
  if (!parsed.success) {
    const structuredError = treeifyError(parsed.error)
    return NextResponse.json(
      { error: 'invalid input', details: structuredError },
      { status: 400 }
    );
  }

  const validatedData = parsed.data;

  try {
    const { data, error } = await supabase
        .from('user_invoice')
        .insert([validatedData])
        .select();    
    if (error) {
        return NextResponse.json(
        { error: 'insert failed', details: error.message },
        { status: 500 }
        );
    }
    return NextResponse.json({
        message: 'invoice created successfully',
        data: data[0]
    });

  } catch (error: unknown) {
    return NextResponse.json(
        { 
            error: 'unexpected server error', 
            details: error instanceof Error ? error.message : String(error)
        },
        { status: 500}
    )
  }
}
