import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    //   TODO: Should we check all the products or just the active ones? (Line 13)
    const { data: products, error } = await supabase
      .from('nutrition_products')
      .select('*')
      .eq('is_active', true)
      .order('number_sold', { ascending: false })
      .limit(5);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(products, 'products');

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
