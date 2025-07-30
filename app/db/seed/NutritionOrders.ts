import { db } from '../db';
import { nutritionOrders } from '../schema';
import { faker } from '@faker-js/faker';

export async function seedNutritionOrders(users: { userId: string }[]) {
  if (users.length === 0) {

    return [];
  }

  const records = Array.from({ length: 8 }).map(() => {
    const user = faker.helpers.arrayElement(users);
    return {
      id: faker.string.uuid(),
      userId: user.userId,
      status: 'completed',
      total: faker.commerce.price({ min: 15, max: 120, dec: 2 }), // returns string
      createdAt: new Date(),
      specialNotes: faker.lorem.sentence(),
    };
  });

  const insertedOrders = await db
    .insert(nutritionOrders)
    .values(records)
    .returning({ id: nutritionOrders.id})
  
  const safeOrders = insertedOrders.filter(
    (order): order is { id: string } => order.id !== null
  );
  
  return safeOrders;

}
