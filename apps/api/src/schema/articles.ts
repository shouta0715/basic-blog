import { idSchema } from "@package/lib";
import * as v from "valibot";

const statusSchema = v.picklist(["draft", "published", "archived"]);

const articleInsertSchema = v.object({
  id: idSchema,
  slug: v.pipe(v.string(), v.slug()),
  title: v.pipe(v.string(), v.minLength(1)),
  content: v.string(),
  coverImageUrl: v.nullable(v.pipe(v.string(), v.url())),
  authorId: v.string(),
  status: statusSchema,
});

export type ArticleInsertPayload = v.InferInput<typeof articleInsertSchema>;

const articleUpdateSchema = v.partial(
  v.omit(articleInsertSchema, ["id", "authorId"]),
);

export type ArticleUpdatePayload = v.InferInput<typeof articleUpdateSchema>;

export const articleSchema = {
  insert: articleInsertSchema,
  update: articleUpdateSchema,
};
