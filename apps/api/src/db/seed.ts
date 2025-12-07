import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "./schemas";

const { user, articles, tags, articleTags, articleLikes } = schemas;

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle({ client: pool, schema: schemas });

  console.info("🌱 Starting seed...");

  try {
    // Clear existing data
    console.info("🧹 Clearing existing data...");
    await db.delete(articleLikes);
    await db.delete(articleTags);
    await db.delete(articles);
    await db.delete(tags);
    await db.delete(user);

    // Seed Users
    console.info("👤 Creating users...");
    const createdUsers = await db
      .insert(user)
      .values([
        {
          name: "Alice Johnson",
          email: "alice@example.com",
          emailVerified: true,
          image: "https://i.pravatar.cc/150?img=1",
        },
        {
          name: "Bob Smith",
          email: "bob@example.com",
          emailVerified: true,
          image: "https://i.pravatar.cc/150?img=2",
        },
        {
          name: "Charlie Brown",
          email: "charlie@example.com",
          emailVerified: false,
          image: "https://i.pravatar.cc/150?img=3",
        },
      ])
      .returning();

    if (
      createdUsers.length !== 3 ||
      !createdUsers[0] ||
      !createdUsers[1] ||
      !createdUsers[2]
    ) {
      throw new Error("Failed to create users");
    }
    const user1 = createdUsers[0];
    const user2 = createdUsers[1];
    const user3 = createdUsers[2];

    console.info(`✅ Created ${createdUsers.length} users`);

    // Seed Tags
    console.info("🏷️  Creating tags...");
    const createdTags = await db
      .insert(tags)
      .values([
        { name: "React", slug: "react" },
        { name: "TypeScript", slug: "typescript" },
        { name: "Node.js", slug: "nodejs" },
        { name: "Database", slug: "database" },
        { name: "Web Development", slug: "web-development" },
      ])
      .returning();

    if (
      createdTags.length !== 5 ||
      !createdTags[0] ||
      !createdTags[1] ||
      !createdTags[2] ||
      !createdTags[3] ||
      !createdTags[4]
    ) {
      throw new Error("Failed to create tags");
    }
    const tagReact = createdTags[0];
    const tagTypeScript = createdTags[1];
    const tagNode = createdTags[2];
    const tagDB = createdTags[3];
    const tagWeb = createdTags[4];

    console.info(`✅ Created ${createdTags.length} tags`);

    // Seed Articles
    console.info("📝 Creating articles...");
    const createdArticles = await db
      .insert(articles)
      .values([
        {
          slug: "getting-started-with-react",
          title: "React入門：初めてのコンポーネント作成",
          content: `# React入門

Reactは、Facebook（現Meta）が開発したUIライブラリです。

## コンポーネントの作成

\`\`\`tsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
\`\`\`

このように、簡単にコンポーネントを作成できます。`,
          coverImageUrl: "https://picsum.photos/seed/react1/800/400",
          authorId: user1.id,
          status: "published",
          publishedAt: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          slug: "typescript-best-practices",
          title: "TypeScript のベストプラクティス 2024",
          content: `# TypeScript ベストプラクティス

TypeScriptを使った開発で役立つベストプラクティスを紹介します。

## 型定義を明示的に

\`\`\`typescript
// Good
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Bad
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\``,
          coverImageUrl: "https://picsum.photos/seed/ts1/800/400",
          authorId: user1.id,
          status: "published",
          publishedAt: new Date(
            Date.now() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          slug: "nodejs-api-development",
          title: "Node.jsでREST APIを作ろう",
          content: `# Node.js REST API開発

Node.jsを使ってRESTful APIを作成する方法を解説します。

## Expressの基本

\`\`\`javascript
import express from 'express';

const app = express();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});
\`\`\``,
          coverImageUrl: "https://picsum.photos/seed/node1/800/400",
          authorId: user2.id,
          status: "published",
          publishedAt: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          slug: "database-design-tips",
          title: "データベース設計のコツ",
          content: `# データベース設計

効率的なデータベース設計のポイントをまとめました。

## 正規化について

データベースの正規化は、データの冗長性を排除し、整合性を保つための重要な手法です。`,
          coverImageUrl: "https://picsum.photos/seed/db1/800/400",
          authorId: user2.id,
          status: "draft",
        },
      ])
      .returning();

    if (
      createdArticles.length !== 4 ||
      !createdArticles[0] ||
      !createdArticles[1] ||
      !createdArticles[2] ||
      !createdArticles[3]
    ) {
      throw new Error("Failed to create articles");
    }
    const article1 = createdArticles[0];
    const article2 = createdArticles[1];
    const article3 = createdArticles[2];
    const article4 = createdArticles[3];

    console.info(`✅ Created ${createdArticles.length} articles`);

    // Seed Article Tags
    console.info("🔗 Creating article-tag relationships...");
    await db.insert(articleTags).values([
      { articleId: article1.id, tagId: tagReact.id },
      { articleId: article1.id, tagId: tagWeb.id },
      { articleId: article2.id, tagId: tagTypeScript.id },
      { articleId: article2.id, tagId: tagWeb.id },
      { articleId: article3.id, tagId: tagNode.id },
      { articleId: article3.id, tagId: tagWeb.id },
      { articleId: article4.id, tagId: tagDB.id },
    ]);

    console.info("✅ Created article-tag relationships");

    // Seed Article Likes
    console.info("❤️  Creating article likes...");
    await db.insert(articleLikes).values([
      { articleId: article1.id, userId: user2.id },
      { articleId: article1.id, userId: user3.id },
      { articleId: article2.id, userId: user2.id },
      { articleId: article2.id, userId: user3.id },
      { articleId: article3.id, userId: user1.id },
      { articleId: article3.id, userId: user3.id },
    ]);

    console.info("✅ Created article likes");

    console.info("\n🎉 Seed completed successfully!");
    console.info("\n📊 Summary:");
    console.info(`   Users: 3`);
    console.info(`   Articles: 4 (3 published, 1 draft)`);
    console.info(`   Tags: 5`);
    console.info(`   Article-Tag relations: 7`);
    console.info(`   Likes: 6`);
  } catch (error) {
    console.error("❌ Error during seed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed()
  .then(() => {
    console.info("\n✨ All done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to seed:", error);
    process.exit(1);
  });
