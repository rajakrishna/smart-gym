import { sql } from 'drizzle-orm';
import { db } from './db';

export async function createDatabase() {
  // Enums
  await db.execute(sql`
    CREATE TYPE message_type AS ENUM ('class cancellation', 'class reminder');
  `);

  await db.execute(sql`
    CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled', 'waitlisted');
  `);

  await db.execute(sql`
    CREATE TYPE class_category AS ENUM ('yoga', 'hiit', 'cycling', 'aquatic', 'boxing');
  `);

  await db.execute(sql`
    CREATE TYPE product_category AS ENUM ('drink', 'protein_bar', 'snack', 'cafe');
  `);

  // Users table
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
      email TEXT,
      phone TEXT,
      user_image TEXT,
      membership_plan TEXT,
      created_at TIMESTAMP DEFAULT now()
    );
  `);

  await db.execute(sql`
    ALTER TABLE "user"
    ADD CONSTRAINT unique_user_email UNIQUE (email);
  `);

  // Nutrition Products
  await db.execute(sql`
    CREATE TABLE nutrition_products (
      product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT,
      product_image TEXT,
      product_description TEXT,
      price NUMERIC,
      quantity INTEGER,
      min_quantity INTEGER,
      category product_category,
      number_sold INTEGER,
      restock BOOLEAN,
      is_active BOOLEAN
    );
  `);

  // Coaches
  await db.execute(sql`
    CREATE TABLE coaches (
      coach_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      first_name TEXT,
      last_name TEXT,
      profile_picture TEXT,
      created_at TIMESTAMP DEFAULT now()
    );
  `);

  // Classes
  await db.execute(sql`
    CREATE TABLE classes (
      class_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      coach_id UUID,
      class_name TEXT,
      category class_category,
      scheduled_on TIMESTAMP,
      start_time TIMESTAMP,
      end_time TIMESTAMP,
      capacity INTEGER,
      created_at TIMESTAMP DEFAULT now()
    );
  `);

  await db.execute(sql`
    ALTER TABLE classes
    ADD CONSTRAINT fk_class_coach FOREIGN KEY (coach_id) REFERENCES coaches(coach_id);
  `);

  // Messages
  await db.execute(sql`
    CREATE TABLE messages (
      message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID,
      type message_type,
      email TEXT,
      title TEXT,
      body TEXT,
      sent_at TIMESTAMP DEFAULT now(),
      delivery_method TEXT
    );
  `);

  await db.execute(sql`
    ALTER TABLE messages
    ADD CONSTRAINT fk_messages_user FOREIGN KEY (user_id) REFERENCES "user"(user_id);
  `);

  // Nutrition Orders
  await db.execute(sql`
    CREATE TABLE nutrition_orders (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID,
      status TEXT,
      total NUMERIC,
      created_at TIMESTAMP DEFAULT now(),
      special_notes TEXT
    );
  `);

  await db.execute(sql`
    ALTER TABLE nutrition_orders
    ADD CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES "user"(user_id);
  `);

  // Nutrition Order Items
  await db.execute(sql`
    CREATE TABLE nutrition_order_items (
      item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      order_id UUID,
      product_id UUID,
      quantity INTEGER
    );
  `);

  await db.execute(sql`
    ALTER TABLE nutrition_order_items
    ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES nutrition_orders(id),
    ADD CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES nutrition_products(product_id);
  `);

  // Check-ins
  await db.execute(sql`
    CREATE TABLE check_ins (
      checkin_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID,
      check_in_time TIMESTAMP DEFAULT now()
    );
  `);

  await db.execute(sql`
    ALTER TABLE check_ins
    ADD CONSTRAINT fk_checkins_user FOREIGN KEY (user_id) REFERENCES "user"(user_id);
  `);

  // Class Bookings
  await db.execute(sql`
    CREATE TABLE class_bookings (
      class_bookings_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      class_id UUID,
      user_id UUID,
      booking_status booking_status,
      waitlisted BOOLEAN,
      joined_at TIMESTAMP
    );
  `);

  await db.execute(sql`
    ALTER TABLE class_bookings
    ADD CONSTRAINT fk_class_bookings_class FOREIGN KEY (class_id) REFERENCES classes(class_id),
    ADD CONSTRAINT fk_class_bookings_user FOREIGN KEY (user_id) REFERENCES "user"(user_id);
  `);

  // Metrics
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

  console.log('database created!');
}
