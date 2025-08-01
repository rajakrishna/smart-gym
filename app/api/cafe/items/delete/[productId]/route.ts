import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function DELETE(request: Request, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: existingProduct, error: fetchError } = await supabase
      .from('nutrition_products')
      .select('product_id')
      .eq('product_id', productId)
      .single();

    if (fetchError || !existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('nutrition_products')
      .update({
        is_active: false,
      })
      .eq('product_id', productId)
      .select();

    if (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: 'Product deactivated successfully',
        deactivatedProduct: data?.[0] || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in delete route:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
