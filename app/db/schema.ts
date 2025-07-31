import {
    pgTable,
    uuid,
    text, 
    timestamp,
    numeric, 
    integer, 
    boolean, 
    pgEnum,
    primaryKey,
    foreignKey, 
    unique
} from 'drizzle-orm/pg-core';

// enums
export const messageType = pgEnum('message_type', ['class reminder', 'class cancellation']);
export const bookingStatus = pgEnum('booking_status', ['confirmed', 'cancelled', 'waitlisted']);
export const productCategory = pgEnum('product_category', ['drink', 'protein_bar', 'snack', 'cafe']);
export const classCategory = pgEnum('class_category', ['yoga', 'hiit', 'cycling', 'aquatic', 'boxing']);

// Users table
export const users = pgTable(
    'user',
    {
        userId: uuid('user_id').defaultRandom(),
        roleName: text('role_name'),
        firstName: text('first_name'), 
        lastName: text('last_name'),
        dateOfBirth: text('date_of_birth'),
        address: text('address'), 
        city: text('city'), 
        state: text('state'),
        zipCode: text('zip_code'),
        email: text('email'),
        phone: text('phone'),
        userImage: text('user_image'),
        membershipPlan: text('membership_plan'), 
        created_at: timestamp('created_at').defaultNow(),
    },
    (table) => [
        primaryKey({ columns: [table.userId] }),
        unique('unique_user_email').on(table.email)
    ]
);

// Nutrition Products table
export const nutritionProducts = pgTable(
    'nutrition_products',
    {
        productId: uuid('product_id').defaultRandom(),
        name: text('name'),
        productImage: text('product_image'),
        productDescription: text('product_description'),
        price: numeric('price'),
        quantity: integer('quantity'),
        minQuantity: integer('min_quantity'),
        sku: text('sku'),
        category: productCategory('category'),
        numberSold: integer('number_sold'),
        restock: boolean('restock'),
        isActive: boolean('is_active')
    },
    (table) => [
        primaryKey({ columns: [table.productId]})
    ]
);

// Coaches table
export const coaches = pgTable(
    'coaches',
    {
        coachId: uuid('coach_id').defaultRandom(),
        firstName: text('first_name'),
        lastName: text('last_name'),
        profilePicture: text('profile_picture'),
        createdAt: timestamp('created_at').defaultNow()
    },
    (table) => [
        primaryKey({ columns: [table.coachId] })
    ]
);

// Classes table
export const classes = pgTable(
    'classes',
    {
        classId: uuid('class_id').defaultRandom(),
        coachId: uuid('coach_id'),
        className: text('class_name'),
        scheduledOn: timestamp('scheduled_on'),
        category: classCategory('category'),
        startTime: timestamp('start_time'),
        endTime: timestamp('end_time'),
        capacity: integer('capacity'),
        createdAt: timestamp('created_at').defaultNow()
    },
    (table) => [
        primaryKey({ columns: [table.classId] }),
        foreignKey({ columns: [table.coachId], foreignColumns: [coaches.coachId] })
    ]
);

// Messages table
export const messages = pgTable(
    'messages',
    {
        messageId: uuid('message_id').defaultRandom(), 
        userId: uuid('user_id'),
        type: messageType('type'),
        email: text('email'),
        title: text('title'),
        body: text('body'),
        sentAt: timestamp('sent_at').defaultNow(),
        deliveryMethod: text('delivery_method') 
    },
    (table) => [
        primaryKey({ columns: [table.messageId] }),
        foreignKey({ columns: [table.userId], foreignColumns: [users.userId] })
    ]
);

// Nutrition Orders table
export const nutritionOrders = pgTable(
    'nutrition_orders',
    {
        id: uuid('id').defaultRandom(),
        userId: uuid('user_id'),
        status: text('status'),
        total: numeric('total'),
        createdAt: timestamp('created_at').defaultNow(),
        specialNotes: text('special_notes')
    },
    (table) => [
        primaryKey({ columns: [table.id] }),
        foreignKey({ columns: [table.userId], foreignColumns: [users.userId] })
    ]
);

// Nutrition Order Items table
export const nutritionOrderItems = pgTable(
    'nutrition_order_items',
    {
        itemId: uuid('item_id').defaultRandom(),
        orderId: uuid('order_id'),
        productId: uuid('product_id'),
        quantity: integer('quantity')
    },
    (table) => [
        primaryKey({ columns: [table.itemId] }),
        foreignKey({ columns: [table.orderId], foreignColumns: [nutritionOrders.id] }),
        foreignKey({ columns: [table.productId], foreignColumns: [nutritionProducts.productId] })
    ]
);

// Check-ins table
export const checkIns = pgTable(
    'check_ins',
    {
        checkInId: uuid('checkin_id').defaultRandom(),
        userId: uuid('user_id'),
        checkInTime: timestamp('check_in_time').defaultNow()
    },
    (table) => [
        primaryKey({ columns: [table.checkInId] }),
        foreignKey({ columns: [table.userId], foreignColumns: [users.userId] })
    ]
);

// Class Bookings table
export const classBookings = pgTable(
    'class_bookings',
    {
        classBookingsId: uuid('class_bookings_id').defaultRandom(),
        classId: uuid('class_id'), 
        userId: uuid('user_id'),
        bookingStatus: bookingStatus('booking_status'),
        waitlisted: boolean('waitlisted'),
        joinedAt: timestamp('joined_at')
    },
    (table) => [
        primaryKey({ columns: [table.classBookingsId] }),
        foreignKey({ columns: [table.classId], foreignColumns: [classes.classId] }),
        foreignKey({ columns: [table.userId], foreignColumns: [users.userId] })
    ]
);

// Metrics table
export const metrics = pgTable(
    'metrics',
    {
        metricId: uuid('metric_id').defaultRandom(),
        metricsDate: timestamp('metrics_date').defaultNow(), 
        totalOrders: integer('total_orders'), 
        totalRevenue: numeric('total_revenue'),
        peakHours: text('peak_hours'), 
        popularClasses: text('popular_classes'),
        popularNutritionOrders: text('popular_nutrition_orders'),
        popularOrderItems: text('popular_order_items'),
        createdAt: timestamp('created_at').defaultNow()
    },
    (table) => [
        primaryKey({ columns: [table.metricsDate] })
    ]
);


