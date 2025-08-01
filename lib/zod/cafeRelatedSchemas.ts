import { z } from 'zod';

// Shared cafe product form validation schema
export const cafeProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  product_description: z.string().min(1, 'Description is required'),
  category: z.enum(['cafe', 'drink', 'snack', 'protein_bar'], {
    message: 'Category must be one of: cafe, drink, snack, protein_bar',
  }),
  product_image: z.string().url().optional(),
  sku: z.string().min(1, 'SKU is required'),
  quantity: z.number().min(1, 'Stock quantity is required'),
  min_quantity: z.number().min(1, 'Minimum quantity is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  restock: z.boolean(),
  is_active: z.boolean(),
});

// Type definitions for form data
export type CreateProductFormData = z.infer<typeof cafeProductSchema>;
export type EditProductFormData = z.infer<typeof cafeProductSchema>;

// Legacy alias for backward compatibility
export type ProductFormData = EditProductFormData;
