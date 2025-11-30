import { DrizzleD1Database } from "drizzle-orm/d1";

type Bindings = {
  DB: D1Database;
};

type Variables = {
  db: DrizzleD1Database;
};

export type Env = {
  Bindings: Bindings;
  Variables: Variables;
};
