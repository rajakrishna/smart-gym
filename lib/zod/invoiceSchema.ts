import { z } from 'zod';

export const invoiceSchema = z.object({
    user_id: z.uuid({ message: 'user_id must be valid UUID'}),
    invoice_amount: z.number().positive()
})

export const invoiceIdSchema = z.object({
    user_id:  z.uuid({ message: 'user_id must be valid UUID'})
})

export type InvoiceIdInput = z.infer<typeof invoiceIdSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;