import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "@/db/schemas";
export const db = drizzle({
  client: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  schema: schemas,
});
