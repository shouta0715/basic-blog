import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";
export const env = createEnv({
  server: {
    DATABASE_URL: v.string(),
    BETTER_AUTH_SECRET: v.string(),
    CLIENT_URL: v.string(),
  },
  runtimeEnv: process.env,
});
