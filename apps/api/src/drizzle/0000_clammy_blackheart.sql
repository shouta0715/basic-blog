CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"display_name" text,
	"bio" text,
	"avatar_url" text,
	"password_hash" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"cover_image_url" text,
	"author_id" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "article_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"article_id" text NOT NULL,
	"tag_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "article_likes" (
	"article_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "article_likes_article_id_user_id_pk" PRIMARY KEY("article_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "articles_status_idx" ON "articles" USING btree ("status");--> statement-breakpoint
CREATE INDEX "articles_published_at_idx" ON "articles" USING btree ("published_at");--> statement-breakpoint
CREATE UNIQUE INDEX "article_tags_article_tag_idx" ON "article_tags" USING btree ("article_id","tag_id");--> statement-breakpoint
CREATE INDEX "article_tags_tag_idx" ON "article_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_name_idx" ON "tags" USING btree ("name");--> statement-breakpoint
CREATE INDEX "article_likes_user_idx" ON "article_likes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "article_likes_article_idx" ON "article_likes" USING btree ("article_id");