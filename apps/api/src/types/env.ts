import { NodePgDatabase } from "drizzle-orm/node-postgres";
type Variables = {
  db: NodePgDatabase<Record<string, never>>;
  DATABASE_URL: string;
};

export type Env = {
  Variables: Variables;
};
