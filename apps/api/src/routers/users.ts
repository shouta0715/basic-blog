import { sValidator } from "@hono/standard-validator";
import { idSchema } from "@package/lib";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import * as v from "valibot";
import { user } from "@/db/schemas";
import { db } from "@/lib/db";
import { Env } from "@/types/env";

const app = new Hono<Env>();

app.get("/", async (c) => {
  const result = await db.query.user.findMany();

  return c.json(result);
});

app.get("/:id", sValidator("param", v.object({ id: idSchema })), async (c) => {
  const { id } = c.req.valid("param");

  const foundUser = await db.query.user.findFirst({
    where: eq(user.id, id),
  });

  if (!foundUser) {
    throw new HTTPException(404, { message: "ユーザーが見つかりません" });
  }

  return c.json(foundUser);
});

export { app as usersRouter };
