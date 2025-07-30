import { db } from '../db';
import { nutritionProducts } from '../schema';
import { faker } from '@faker-js/faker';

const product_categories: ('drink' | 'protein_bar' | 'snack' | 'cafe')[] = [
  'drink',
  'protein_bar',
  'snack',
  'cafe',
];

export async function seedNutritionProducts() {
  const records = Array.from({ length: 5 }).map(() => ({
    productId: faker.string.uuid(), 
    name: faker.commerce.productName(),
    productImage: faker.image.url(),
    productDescription: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 5, max: 50, dec: 2 }), 
    quantity: faker.number.int({ min: 10, max: 100 }),
    minQuantity: 5,
    category: faker.helpers.arrayElement(product_categories),
    numberSold: faker.number.int({ min: 0, max: 100 }),
    restock: faker.datatype.boolean(),
    isActive: true,
  }));

  const insertedProducts = await db
    .insert(nutritionProducts)
    .values(records)
    .returning({ productId : nutritionProducts.productId});
  
    const safeProducts = insertedProducts.filter(
      (p): p is { productId: string } => p.productId !== null
    );
  
    return safeProducts;
}
