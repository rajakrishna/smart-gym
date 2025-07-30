import { db } from '../db';
import { classes } from '../schema';
import { faker } from '@faker-js/faker';

const class_categories: ('yoga' | 'hiit' | 'cycling' | 'aquatic' | 'boxing')[] = [
  'yoga',
  'hiit',
  'cycling',
  'aquatic',
  'boxing',
];

export async function seedClasses(coaches: { coachId: string; fullName: string }[]) {
  const classesData = coaches.map((coach) => ({
    classId: faker.string.uuid(),
    coachId: coach.coachId,
    className: faker.lorem.words(2),
    category: faker.helpers.arrayElement(class_categories),
    scheduledOn: faker.date.future(),
    startTime: faker.date.future(),
    endTime: faker.date.future(),
    capacity: faker.number.int({ min: 5, max: 30 }),
    createdAt: new Date(),
  }));

  await db.insert(classes).values(classesData);
  return classesData;
}
