ALTER TABLE "articles" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "article_tags" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "tags" DROP COLUMN "deleted_at";