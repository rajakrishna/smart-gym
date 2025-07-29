import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request, { params }: { params: Promise<{ productId: string }>}) {
  const { productId } = await params;

  const supabase = await createClient();

  const { data: product, error } = await supabase.from('nutrition_products').select('*').eq('product_id', productId).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(product);
}
