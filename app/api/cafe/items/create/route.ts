import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const body = await request.json();

    if (!body) {
      return NextResponse.json({ error: 'No body provided' }, { status: 400 });
    }

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
      sku,
      is_active,
    } = body;

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
          sku,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
