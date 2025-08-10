import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { purchaseSchema } from "@/lib/zod/invoiceSchema"
import { z } from "zod"
import type { PostgrestError } from "@supabase/supabase-js"

type NutritionProduct = { product_id: string; name: string; price: number | string }
type InvoiceRow = { invoice_id: number }
type UserRow = { running_total: number | null }
type LineItem = { product_id: string; name: string; quantity: number; unit_price: number; line_total: number }
type InvoiceItemInsert = { invoice_id: number; product_id: string; quantity: number; unit_price: number; line_total: number }

const toMoney = (n: number) => Math.round(Number(n) * 100) / 100

function errShape(err?: PostgrestError | null) {
  if (!err) return null
  return { code: err.code, message: err.message, details: err.details, hint: err.hint }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = purchaseSchema.safeParse(body)
    if (!parsed.success) {
      const errorTree = z.treeifyError(parsed.error)
      return NextResponse.json({ where: "zod", error: errorTree }, { status: 400 })
    }

    const { user_id, items } = parsed.data
    const supabase = await createClient()

    const productIds = [...new Set(items.map(i => i.product_id))]
    const { data: productsRaw, error: productsError } = await supabase
      .from("nutrition_products")
      .select("product_id, name, price")
      .in("product_id", productIds)

    if (productsError) {
      return NextResponse.json({ where: "fetch products", error: errShape(productsError) }, { status: 500 })
    }
    const products = (productsRaw ?? []) as NutritionProduct[]
    if (products.length !== productIds.length) {
      return NextResponse.json({
        where: "fetch products",
        error: "one or more products not found",
        found: products.length,
        expected: productIds.length,
        missing: productIds.filter(id => !products.some(p => p.product_id === id)),
      }, { status: 404 })
    }

    const productMap = new Map(products.map(p => [p.product_id, { ...p, price: Number(p.price) }]))
    for (const id of productIds) {
      const p = productMap.get(id as string)
      if (!p || Number.isNaN(p.price)) {
        return NextResponse.json({ where: "coerce price", error: `price for product ${id} is not numeric` }, { status: 500 })
      }
    }

    const lineItems: LineItem[] = items.map(({ product_id, quantity }) => {
      const p = productMap.get(product_id)!
      const unit_price = toMoney(Number(p.price))
      const line_total = toMoney(unit_price * quantity)
      return { product_id, name: p.name, quantity, unit_price, line_total }
    })

    const total = toMoney(lineItems.reduce((sum, li) => sum + li.line_total, 0))

    const { data: invoiceRaw, error: invoiceError } = await supabase
      .from("user_invoice")
      .insert({ user_id, invoice_amount: total })
      .select("*")
      .single()

    if (invoiceError || !invoiceRaw) {
      return NextResponse.json({ where: "create invoice", error: errShape(invoiceError) }, { status: 500 })
    }

    const invoice = invoiceRaw as InvoiceRow
    const invoiceId = invoice.invoice_id

    const itemsToInsert: InvoiceItemInsert[] = lineItems.map(li => ({
      invoice_id: invoiceId,
      product_id: li.product_id,
      quantity: li.quantity,
      unit_price: toMoney(li.unit_price),
      line_total: toMoney(li.line_total),
    }))

    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(itemsToInsert)

    if (itemsError) {
      return NextResponse.json({ where: "insert invoice_items", error: errShape(itemsError), payload: itemsToInsert }, { status: 500 })
    }

    const { data: userRaw, error: fetchUserError } = await supabase
      .from("user")
      .select("running_total")
      .eq("user_id", user_id)
      .single()

    if (fetchUserError || !userRaw) {
      return NextResponse.json({ where: "fetch user", error: errShape(fetchUserError) }, { status: 500 })
    }

    const userRow = userRaw as UserRow
    const updatedTotal = toMoney((userRow.running_total ?? 0) + total)

    const { data: updatedUserRaw, error: updatedUserError } = await supabase
      .from("user")
      .update({ running_total: updatedTotal })
      .eq("user_id", user_id)
      .select("user_id, running_total")
      .single()

    if (updatedUserError || !updatedUserRaw) {
      return NextResponse.json({ where: "update running_total", error: errShape(updatedUserError) }, { status: 500 })
    }

    return NextResponse.json({
      invoice: { invoice_id: invoiceId, user_id, invoice_amount: total },
      items: lineItems,
      user_id: updatedUserRaw.user_id,
      running_total: updatedUserRaw.running_total,
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown error"
    return NextResponse.json({ where: "catch", error: msg }, { status: 500 })
  }
}
