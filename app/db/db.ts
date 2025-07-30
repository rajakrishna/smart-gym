import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const connectionString = process.env.SMART_GYM_DB;

const client = postgres(connectionString!);
export const db = drizzle(client);
