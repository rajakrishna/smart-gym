import { db } from '../db';
import { nutritionOrderItems } from '../schema';
import { faker } from '@faker-js/faker';

export async function seedNutritionOrderItems(
  orders: { id: string }[],
  products: { productId: string }[]
) {
  
  if (orders.length === 0 || products.length === 0) {
    return;
  }

  const records = Array.from({ length: 12 }).map(() => {
    const order = faker.helpers.arrayElement(orders);
    const product = faker.helpers.arrayElement(products);
    return {
      itemId: faker.string.uuid(),
      orderId: order.id,
      productId: product.productId,
      quantity: faker.number.int({ min: 1, max: 5 }),
    };
  });

  await db.insert(nutritionOrderItems).values(records);
}

