import { sValidator } from "@hono/standard-validator";
import { articleSchema } from "@package/lib";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import * as v from "valibot";
import { articles } from "@/db/schemas";
import { db } from "@/lib/db";
import { Env } from "@/types/env";

const app = new Hono<Env>();

app.get("/", async (c) => {
  const result = await db.query.articles.findMany();

  return c.json(result);
});

app.get(
  "/:id",
  sValidator("param", v.object({ id: articleSchema.entries.id })),
  async (c) => {
    const { id } = c.req.valid("param");

    const article = await db.query.articles.findFirst({
      where: eq(articles.id, id),
    });

    if (!article) {
      throw new HTTPException(404, { message: "記事が見つかりません" });
    }

    return c.json(article);
  },
);

app.post("/", sValidator("json", articleSchema), async (c) => {
  const user = c.get("user");
  const data = c.req.valid("json");

  if (user.id !== data.authorId) {
    throw new HTTPException(403, {
      message: "この記事を作成する権限がありません",
    });
  }

  const [article] = await db
    .insert(articles)
    .values({
      ...data,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt:
        data.status === "published" ? new Date().toISOString() : null,
    })
    .returning();

  return c.json(article, 201);
});

app.patch(
  "/:id",
  sValidator("param", v.object({ id: articleSchema.entries.id })),
  sValidator("json", articleSchema),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");

    const existing = await db.query.articles.findFirst({
      where: eq(articles.id, id),
    });

    if (!existing) {
      throw new HTTPException(404, { message: "記事が見つかりません" });
    }

    if (existing.authorId !== user.id) {
      throw new HTTPException(403, {
        message: "この記事を編集する権限がありません",
      });
    }

    const isNewlyPublished =
      data.status === "published" && existing.status !== "published";

    const [updated] = await db
      .update(articles)
      .set({
        ...existing,
        ...data,
        createdAt: existing.createdAt,
        updatedAt: new Date().toISOString(),
        publishedAt: isNewlyPublished
          ? new Date().toISOString()
          : existing.publishedAt,
      })
      .where(eq(articles.id, id))
      .returning();

    return c.json(updated);
  },
);

app.delete(
  "/:id",
  sValidator("param", v.object({ id: articleSchema.entries.id })),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");

    const existing = await db.query.articles.findFirst({
      where: eq(articles.id, id),
    });

    if (!existing) {
      throw new HTTPException(404, { message: "記事が見つかりません" });
    }

    if (existing.authorId !== user.id) {
      throw new HTTPException(403, {
        message: "この記事を削除する権限がありません",
      });
    }

    await db.delete(articles).where(eq(articles.id, id));

    return c.json({ success: true });
  },
);

export { app as articlesRouter };
