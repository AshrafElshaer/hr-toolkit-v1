import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
config({ path: ".env" });

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, {
  prepare: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
export const db = drizzle(client, {
  schema,
});

export * from "./schema";
