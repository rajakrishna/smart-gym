import { db } from '../db';
import { classBookings, bookingStatus } from '../schema';
import { faker } from '@faker-js/faker';

type BookingStatus = typeof bookingStatus.enumValues[number];

export async function seedClassBookings(
  users: { userId: string }[],
  classes: { classId: string }[]
) {
  const records = Array.from({ length: 10 }).map(() => {
    const user = faker.helpers.arrayElement(users);
    const cls = faker.helpers.arrayElement(classes);

    return {
      classBookingsId: faker.string.uuid(),
      classId: cls.classId,
      userId: user.userId,
      bookingStatus: 'confirmed' as BookingStatus,
      waitlisted: false,
      joinedAt: new Date(),
    };
  });

  await db.insert(classBookings).values(records);
}
