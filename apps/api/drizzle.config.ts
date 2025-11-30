import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) throw new Error("DATABASE_URL is not set");

export default defineConfig({
  out: "./src/drizzle",
  schema: "./src/db/schemas/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
