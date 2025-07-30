import { db } from '../db';
import { classes } from '../schema';
import { faker } from '@faker-js/faker';

export async function seedClasses(coaches: { coachId: string; fullName: string }[]) {
  const classesData = coaches.map((coach) => ({
    classId: faker.string.uuid(),
    coachId: coach.coachId,
    fullName: coach.fullName,
    className: faker.lorem.words(2),
    category: faker.helpers.arrayElement(['yoga', 'cardio', 'weights']),
    scheduledOn: faker.date.future(),
    start: faker.date.future(),
    end: faker.date.future(),
    capacity: faker.number.int({ min: 5, max: 30 }),
    createdAt: new Date(),
  }));

  await db.insert(classes).values(classesData);
  return classesData;
}
