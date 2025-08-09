import { z } from 'zod';

export const invoiceSchema = z.object({
    user_id: z.uuid({ message: 'user_id must be valid UUID'}),
    invoice_amount: z.number().positive()
});

export const invoiceIdSchema = z.object({
    user_id:  z.uuid({ message: 'user_id must be valid UUID'})
});

export const purchaseSchema = z.object({
  user_id: z.uuid({ message: "user_id must be valid UUID" }),
  items: z.array(
    z.object({
      product_id: z.uuid({ message: "product_id must be valid UUID" }),
      quantity: z.number().int().positive({ message: "quantity must be > 0" }),
    })
  ).min(1, "At least one product must be included"),
});

export type InvoiceIdInput = z.infer<typeof invoiceIdSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type PurchaseInput = z.infer<typeof purchaseSchema>;