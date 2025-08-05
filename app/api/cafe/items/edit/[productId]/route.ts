import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function PATCH(request: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  const supabase = await createClient();

  const body = await request.json();

  const { data, error } = await supabase
    .from('nutrition_products')
    .update({
      name: body.name,
      product_image: body.product_image,
      product_description: body.product_description,
      price: body.price,
      quantity: body.quantity,
      min_quantity: body.min_quantity,
      category: body.category,
      number_sold: body.number_sold,
      restock: body.restock,
      is_active: body.is_active,
    })
    .eq('product_id', productId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
