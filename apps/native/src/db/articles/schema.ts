import { idSchema } from "@package/lib";
import * as v from "valibot";

export const articleStatusSchema = v.picklist([
  "draft",
  "published",
  "archived",
]);

const slugSchema = v.pipe(v.string(), v.slug());

export const articleSchema = v.object({
  id: v.optional(idSchema, () => crypto.randomUUID()),
  slug: slugSchema,
  title: v.pipe(
    v.string(),
    v.minLength(1, "タイトルは1文字以上で入力してください"),
  ),
  content: v.pipe(
    v.string(),
    v.minLength(1, "コンテンツは1文字以上で入力してください"),
  ),
  coverImageUrl: v.nullish(v.pipe(v.string(), v.url()), null),
  authorId: v.string(),
  status: v.optional(articleStatusSchema, "draft"),
  publishedAt: v.nullish(v.string(), null),
  createdAt: v.optional(v.pipe(v.string()), () => new Date().toISOString()),
  updatedAt: v.optional(v.pipe(v.string()), () => new Date().toISOString()),
});

export type Article = v.InferOutput<typeof articleSchema>;
export type ArticleInsert = v.InferInput<typeof articleSchema>;
