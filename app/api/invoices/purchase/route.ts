import { NextResponse } from "next/server";
import { purchaseSchema } from "@/lib/zod/invoiceSchema";
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = purchaseSchema.safeParse(body)
        
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.format() },
                { status: 400 }
            )
        }

        const { 
            user_id, 
            product_id 
        } = parsed.data 
        const supabase = await createClient();

        const { 
            data: product, 
            error: productError 
        } = await supabase
        .from('nutrition_products')
        .select('*')
        .eq('product_id', product_id)
        .single();

        if (productError || !product) {
            return NextResponse.json(
                { error: "product not found" }, 
                { status: 404 }
            );
        }

        const price = product.price

        const { 
            data: invoice, 
            error: invoiceError 
        } = await supabase
            .from('user_invoice')
            .insert({
                user_id, 
                invoice_amount: price 
            })
            .select()
            .single()
        
        if (invoiceError || !invoice) {
            return NextResponse.json(
                { error: 'invoice not created'}, 
                { status: 500 }
            )
        }

        const {
            data: user,
            error: fetchUserError
        } = await supabase
            .from('user')
            .select('running_total')
            .eq('user_id', user_id)
            .single();
        
        if (fetchUserError || !user) {
            return NextResponse.json(
                { error: "failed to update running total" },
                { status: 500 }
            )
        }
        const updatedTotal = (user?.running_total ?? 0) + price;

        const {
            data: updatedUser, error: updatedUserError
        } = await supabase
            .from('user')
            .update({ running_total: updatedTotal })
            .eq('user_id', user_id)
            .select('user_id, running_total')
            .single()
        
        if (updatedUserError || !updatedUser) {
            return NextResponse.json(
                { error: 'running total not updated'}, 
                { status: 500 }
            )
        }

        return NextResponse.json({
            user_id: updatedUser.user_id,
            running_total: updatedUser.running_total,
            product, 
            invoice
        });        
    } catch {
        return NextResponse.json(
            { error: "internal server error"},
            { status: 500 }
        )
    }
  }
