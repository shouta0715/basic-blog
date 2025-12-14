import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import {
  corsMiddleware,
  sessionMiddleware,
} from "./middleware/auth/auth-middleware";
import { Env } from "@/types/env";

const app = new Hono<Env>();

app.use("*", logger());
app.use("*", corsMiddleware);
app.use("*", sessionMiddleware);

app.get("/", (c) => c.text("Hello Hono!"));

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

const port = Number(process.env.PORT) || 8000;

console.debug(`Server is running on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});
