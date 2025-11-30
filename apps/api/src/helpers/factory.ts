import { drizzle } from "drizzle-orm/node-postgres";
import { createFactory } from "hono/factory";
import { Pool } from "pg";
import { Env } from "@/types/env";

const factory = createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      const db = drizzle({ client: pool });
      c.set("db", db);
      await next();
    });
  },
});

export { factory };
