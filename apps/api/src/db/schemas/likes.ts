import {
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { articles } from "./articles";
import { user } from "./users";

export const articleLikes = pgTable(
  "article_likes",
  {
    articleId: text("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (table) => [
    primaryKey({ columns: [table.articleId, table.userId] }),
    index("article_likes_user_idx").on(table.userId),
    index("article_likes_article_idx").on(table.articleId),
  ],
);

export type ArticleLike = typeof articleLikes.$inferSelect;
export type NewArticleLike = typeof articleLikes.$inferInsert;
