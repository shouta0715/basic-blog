import { except } from "hono/combine";
import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";
import { auth } from "@/lib/auth";
import { Env } from "@/types/env";

const corsMiddleware = cors({
  origin: "http://localhost:3000", // replace with your origin
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
});

const sessionMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

const sessionMiddlewareWithExcept = except(["/auth/*"], sessionMiddleware);

export { corsMiddleware, sessionMiddlewareWithExcept as sessionMiddleware };
