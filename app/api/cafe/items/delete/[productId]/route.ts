import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function DELETE(request: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  const supabase = await createClient();

  const { error: orderItemsError } = await supabase.from('nutrition_order_items').delete().eq('product_id', productId);
  if (orderItemsError) {
    return NextResponse.json({ error: orderItemsError.message }, { status: 500 });
  }
  
  const { data: product, error } = await supabase.from('nutrition_products').delete().eq('product_id', productId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(product);
}
