import { sql } from 'drizzle-orm';
import { db } from '../db';
import { createDatabase } from '../createTables';

import { seedUser } from '../seed/User';
import { seedCoaches } from '../seed/Coaches';
import { seedClasses } from '../seed/Classes';
import { seedClassBookings } from '../seed/ClassBookings';
import { seedMessages } from '../seed/Messages';
import { seedNutritionProducts } from '../seed/NutritionProducts';
import { seedNutritionOrders } from '../seed/NutritionOrders';
import { seedNutritionOrderItems } from '../seed/NutritionOrderItems';
import { seedCheckIns } from '../seed/CheckIns';
import { seedMetrics } from '../seed/Metrics';

async function resetTables(){
  await db.execute(sql`
    DROP TABLE IF EXISTS 
      class_bookings, 
      classes, 
      check_ins,
      messages,
      metrics,
      nutrition_order_items, 
      nutrition_orders,
      nutrition_products,
      "user"
    CASCADE
    `);
}

async function seedDatabase() {
  await resetTables();
  console.log("TABLES RESET"); 

  await createDatabase();
  console.log("DATABASE CREATED")

  const users = await seedUser();
  await seedMessages(users);
  console.log("MESSAGE TABLE SEEDED")
  await seedCheckIns(users);
  console.log("CHECK INS SEEDED")

  const coaches = await seedCoaches();
  const classes = await seedClasses(coaches);
  await seedClassBookings(users, classes);

  const products = await seedNutritionProducts();
  const orders = await seedNutritionOrders(users);
  await seedNutritionOrderItems(orders, products);

  await seedMetrics();
}

async function main() {
  try {
    await seedDatabase();
    process.exit(0);
  } catch (error) {
    console.error(error)
    process.exit(1);
  }
}

main();
