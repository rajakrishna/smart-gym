import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();
  const {
    name,
    product_image,
    product_description,
    price,
    quantity,
    min_quantity,
    category,
    number_sold,
    restock,
    is_active,
  } = body;

  // Insert new user into Supabase
  const { data, error } = await supabase
    .from('nutrition_products')
    .insert([
      {
        name,
        product_image,
        product_description,
        price,
        quantity,
        min_quantity,
        category,
        number_sold,
        restock,
        is_active,
      },
    ])
    .select();

  // Insert item
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data[0] }, { status: 201 });
}
