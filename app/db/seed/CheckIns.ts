import { db } from '../db';
import { checkIns } from '../schema';

export async function seedCheckIns(users: { userId: string }[]) {
  const checkins = users.map((u) => ({
    userId: u.userId,
    checkInTime: new Date(),
  }));

  await db.insert(checkIns).values(checkins);
}
