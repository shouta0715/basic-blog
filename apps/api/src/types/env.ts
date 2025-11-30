import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schemas from "@/db/schemas";
type Variables = {
  db: NodePgDatabase<typeof schemas>;
} & Cloudflare.Env;

export type Env = {
  Bindings: CloudflareBindings;
  Variables: Variables;
};
