import { db } from '../db';
import { messages } from '../schema';
import { faker } from '@faker-js/faker';

export async function seedMessages(users: { userId: string; fullName: string; email: string }[]) {
  if (!users.length) {
    return;
  }

  const records = users.flatMap((user) =>
    Array.from({ length: 2 }).map(() => ({
      messageId: faker.string.uuid(),
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      type: faker.helpers.arrayElement(['class reminder', 'class cancellation']),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      category: faker.helpers.arrayElement(['fitness', 'nutrition', 'membership']),
      deliveryMethod: faker.helpers.arrayElement(['email', 'sms']),
      sentAt: new Date(),
    }))
  );

  await db.insert(messages).values(records);
}
