import { sql } from 'drizzle-orm';
import { db } from './db';

export async function createDatabase() {
  // enums
  await db.execute(sql`
    CREATE TYPE message_type AS ENUM ('class reminder', 'class cancellation');
  `);

  await db.execute(sql`
    CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled', 'waitlisted');
  `);

  // users table
  await db.execute(sql`
    CREATE TABLE "user" (
      user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      role_name TEXT,
      first_name TEXT,
      last_name TEXT,
      date_of_birth TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      zip_code TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      user_image TEXT,
      membership_plan TEXT,
      created_at TIMESTAMP DEFAULT now()
    );
  `);

  // nutrition Products
  await db.execute(sql`
    CREATE TABLE nutrition_products (
      product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT,
      product_image TEXT,
      product_description TEXT,
      price NUMERIC,
      quantity INTEGER,
      min_quantity INTEGER,
      category TEXT,
      number_sold INTEGER,
      restock BOOLEAN,
      is_active BOOLEAN
    );
  `);

  // coaches table
  await db.execute(sql`
    CREATE TABLE coaches (
      coach_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      first_name TEXT,
      last_name TEXT,
      profile_picture TEXT,
      created_at TIMESTAMP DEFAULT now()
    );
  `);

  // classes table
  await db.execute(sql`
    CREATE TABLE classes (
      class_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      coach_id UUID REFERENCES coaches(coach_id),
      class_name TEXT,
      scheduled_on TIMESTAMP,
      start_time TIMESTAMP,
      end_time TIMESTAMP,
      capacity INTEGER,
      created_at TIMESTAMP DEFAULT now()
    );
  `);

  // Messages table
  await db.execute(sql`
    CREATE TABLE messages (
      message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES "user"(user_id),
      type message_type,
      email TEXT,
      title TEXT,
      body TEXT,
      sent_at TIMESTAMP DEFAULT now(),
      delivery_method TEXT
    );
  `);

  // nutrition orders table
  await db.execute(sql`
    CREATE TABLE nutrition_orders (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES "user"(user_id),
      status TEXT,
      total NUMERIC,
      created_at TIMESTAMP DEFAULT now(),
      special_notes TEXT
    );
  `);

  // nutrition order items table
  await db.execute(sql`
    CREATE TABLE nutrition_order_items (
      item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      order_id UUID REFERENCES nutrition_orders(id),
      product_id UUID REFERENCES nutrition_products(product_id),
      quantity INTEGER
    );
  `);

  // check-ins table
  await db.execute(sql`
    CREATE TABLE check_ins (
      checkin_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES "user"(user_id),
      check_in_time TIMESTAMP DEFAULT now()
    );
  `);

  // class bookings table
  await db.execute(sql`
    CREATE TABLE class_bookings (
      class_bookings_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      class_id UUID REFERENCES classes(class_id),
      user_id UUID REFERENCES "user"(user_id),
      booking_status booking_status,
      waitlisted BOOLEAN,
      joined_at TIMESTAMP
    );
  `);

  // metrics table
  await db.execute(sql`
    CREATE TABLE metrics (
      metric_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      metrics_date TIMESTAMP DEFAULT now(),
      total_orders INTEGER,
      total_revenue NUMERIC,
      peak_hours TEXT,
      popular_classes TEXT,
      popular_nutrition_orders TEXT,
      popular_order_items TEXT,
      created_at TIMESTAMP DEFAULT now()
    );
  `);

  console.log('db created');
}
