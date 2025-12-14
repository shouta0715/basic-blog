import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "@/db/schemas";
import { env } from "@/env";
export const db = drizzle({
  client: new Pool({
    connectionString: env.DATABASE_URL,
  }),
  schema: schemas,
});
