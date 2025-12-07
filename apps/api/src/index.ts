import { Hono } from "hono";
import { auth } from "./lib/auth";
import {
  corsMiddleware,
  sessionMiddleware,
} from "./middleware/auth/auth-middleware";
import { Env } from "@/types/env";

const app = new Hono<Env>();

app.use("*", corsMiddleware);
app.use("*", sessionMiddleware);

app.get("/", (c) => c.text("Hello Hono!"));

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default app;
