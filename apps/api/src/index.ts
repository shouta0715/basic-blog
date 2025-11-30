import { Hono } from "hono";
import { factory } from "./helpers/factory";
import { Env } from "@/types/env";

const app: Hono<Env> = factory.createApp();

app.get("/", (c) => c.text("Hello Hono!"));

export default app;
