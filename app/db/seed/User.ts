import { db } from '../db';
import { users } from '../schema';
import { faker } from '@faker-js/faker';

export async function seedUser() {
    const values = Array.from({ length: 10 }).map(() => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return {
            userId: faker.string.uuid(),
            roleName: 'Member',
            fullName: `${firstName} ${lastName}`,
            firstName,
            lastName,
            email: faker.internet.email({ firstName, lastName }),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            dateOfBirth: faker.date.past({ years: 30 }).toISOString(),
            userImage: faker.image.avatar(),
            membershipPlan: 'Basic',
            stripeCustomerId: faker.string.uuid(),
            createdAt: new Date(),
        };
    });

    await db.insert(users).values(values);
    return values;
}
