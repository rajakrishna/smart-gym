import { sql } from 'drizzle-orm';
import { db } from '../db';
// import { createDatabase } from '../createTables';

import { seedUser } from '../seed/User';
import { seedCoaches } from '../seed/Coaches';
import { seedClasses } from '../seed/Classes';
import { seedClassBookings } from '../seed/ClassBookings';
import { seedMessages } from '../seed/Messages';
import { seedNutritionProducts } from '../seed/NutritionProducts';
import { seedNutritionOrders } from '../seed/NutritionOrders';
import { seedNutritionOrderItems } from '../seed/NutritionOrderItems';
import { seedCheckIns } from '../seed/CheckIns';
// import { seedMetrics } from '../seed/Metrics';

export async function resetTables() {
  try {
    // drop all tables
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
      CASCADE;
    `);

    // drop enums if you're resetting everything
    await db.execute(sql`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
          DROP TYPE booking_status;
        END IF;
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'message_type') THEN
          DROP TYPE message_type;
        END IF;
      END
      $$;
    `);

    // Recreate required extensions
    await db.execute(sql`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    console.log('tables and enums dropped successfully. ready for schema re-creation.');
  } catch (error) {
    console.error('error resetting tables:', error);
  }
}

async function seedDatabase() {
  console.log("RESETTING TABLES...");
  await resetTables();
  console.log("TABLES RESET");

  // console.log("CREATING DATABASE...");
  // await createDatabase();
  // console.log("DATABASE CREATED");

  console.log("SEEDING USERS...");
  const users = await seedUser();
  console.log("USERS SEEDED");

  console.log("SEEDING MESSAGES...");
  await seedMessages(users);
  console.log("MESSAGES SEEDED");

  console.log("SEEDING CHECK INS...");
  await seedCheckIns(users);
  console.log("CHECK INS SEEDED");

  console.log("SEEDING COACHES...");
  const coaches = await seedCoaches();
  console.log("COACHES SEEDED");

  console.log("SEEDING CLASSES...");
  const classes = await seedClasses(coaches);
  console.log("CLASSES SEEDED");

  console.log("SEEDING CLASS BOOKINGS...");
  await seedClassBookings(users, classes);
  console.log("CLASS BOOKINGS SEEDED");

  console.log("SEEDING NUTRITION PRODUCTS...");
  const products = await seedNutritionProducts();
  console.log("NUTRITION PRODUCTS SEEDED");

  console.log("SEEDING NUTRITION ORDERS...");
  const orders = await seedNutritionOrders(users);
  console.log("NUTRITION ORDERS SEEDED");

  console.log("SEEDING NUTRITION ORDER ITEMS...");
  await seedNutritionOrderItems(orders, products);
  console.log("NUTRITION ORDER ITEMS SEEDED");

  // console.log("SEEDING METRICS...");
  // await seedMetrics();
  // console.log("METRICS SEEDED");

  console.log("DATABASE SEEDING COMPLETE");
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
