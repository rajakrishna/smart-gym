import { db } from '../db';
import { coaches } from '../schema';
import { faker } from '@faker-js/faker';

export async function seedCoaches() {
  const coachesData = Array.from({ length: 5 }).map(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      coachId: faker.string.uuid(),
      fullName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      profilePicture: faker.image.avatar(),
      createdAt: new Date(),
    };
  });

  await db.insert(coaches).values(coachesData);
  return coachesData;
}
