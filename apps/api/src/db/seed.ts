import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as v from "valibot";
import * as schemas from "./schemas";
import { env } from "@/env";
import { articleSchema, ArticleInsertPayload } from "@/schema/articles";

const { user, articles, tags, articleTags, articleLikes } = schemas;

// ランダムな要素を取得
function randomPick<T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  const item = arr[index];

  if (item === undefined) {
    throw new Error("Array is empty");
  }

  return item;
}

// ランダムな複数要素を取得（重複なし）
function randomPickMultiple<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, Math.min(count, arr.length));
}

// ランダムな日付を生成（過去n日以内）
function randomDate(daysAgo: number): string {
  const now = Date.now();
  const randomMs = Math.floor(Math.random() * daysAgo * 24 * 60 * 60 * 1000);

  return new Date(now - randomMs).toISOString();
}

// 記事タイトルのテンプレート
const titleTemplates = [
  "{tech}入門：初心者向けガイド",
  "{tech}のベストプラクティス 2024",
  "{tech}で{action}する方法",
  "なぜ{tech}を使うべきなのか",
  "{tech}と{tech2}の比較",
  "{tech}のパフォーマンス最適化",
  "{tech}でよくあるミス10選",
  "{tech}の最新機能まとめ",
  "プロが教える{tech}の使い方",
  "{tech}で{project}を作ろう",
  "{tech}のセキュリティ対策",
  "{tech}のテスト戦略",
  "{tech}でCIを構築する",
  "{tech}の設計パターン",
  "実践{tech}：{project}開発",
];

const techWords = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "Vue.js",
  "Rust",
  "Go",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "REST API",
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
  "Redis",
  "Prisma",
  "Drizzle",
  "Hono",
];

const actionWords = [
  "開発",
  "デプロイ",
  "テスト",
  "デバッグ",
  "最適化",
  "スケール",
  "モニタリング",
  "自動化",
];

const projectWords = [
  "ブログ",
  "ECサイト",
  "チャットアプリ",
  "TODO管理",
  "ダッシュボード",
  "API",
  "CLI",
  "認証システム",
];

// タイトルを生成
function generateTitle(): string {
  const template = randomPick(titleTemplates);

  return template
    .replace("{tech}", randomPick(techWords))
    .replace("{tech2}", randomPick(techWords))
    .replace("{action}", randomPick(actionWords))
    .replace("{project}", randomPick(projectWords));
}

// slugを生成
function generateSlug(title: string, index: number): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 30);

  return `${base}-${index}`;
}

// コンテンツを生成
function generateContent(title: string): string {
  const tech = randomPick(techWords);

  return `# ${title}

この記事では、${tech}について詳しく解説します。

## はじめに

${tech}は現代のソフトウェア開発において重要な技術です。
この記事を読むことで、基本的な概念から実践的な使い方まで学ぶことができます。

## 基本概念

${tech}を使い始める前に、いくつかの基本概念を理解しておく必要があります。

### セットアップ

\`\`\`bash
# インストールコマンド
npm install ${tech.toLowerCase().replace(/\s+/g, "-")}
\`\`\`

## 実装例

以下は基本的な実装例です：

\`\`\`typescript
// サンプルコード
function example() {
  console.log("Hello, ${tech}!");
  return { success: true };
}
\`\`\`

## ベストプラクティス

1. **コードの可読性** - 常に読みやすいコードを心がけましょう
2. **テストの重要性** - ユニットテストを書く習慣をつけましょう
3. **ドキュメント** - 適切なコメントとドキュメントを残しましょう

## まとめ

${tech}は非常に強力なツールです。
この記事で紹介した内容を参考に、ぜひ実際のプロジェクトで活用してみてください。

## 参考リンク

- [公式ドキュメント](https://example.com)
- [チュートリアル](https://example.com/tutorial)
`;
}

// ユーザー名を生成
const firstNames = [
  "Yuki",
  "Hana",
  "Taro",
  "Sakura",
  "Kenji",
  "Mika",
  "Ryo",
  "Emi",
  "Takeshi",
  "Naomi",
  "Shota",
  "Ai",
  "Kento",
  "Yui",
  "Daiki",
];

const lastNames = [
  "Tanaka",
  "Yamamoto",
  "Suzuki",
  "Sato",
  "Watanabe",
  "Ito",
  "Nakamura",
  "Kobayashi",
  "Kato",
  "Yoshida",
];

// タグデータ
const tagData = [
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Next.js", slug: "nextjs" },
  { name: "Vue.js", slug: "vuejs" },
  { name: "Database", slug: "database" },
  { name: "Web Development", slug: "web-development" },
  { name: "DevOps", slug: "devops" },
  { name: "Testing", slug: "testing" },
  { name: "Performance", slug: "performance" },
  { name: "Security", slug: "security" },
  { name: "API Design", slug: "api-design" },
  { name: "Frontend", slug: "frontend" },
  { name: "Backend", slug: "backend" },
  { name: "Cloud", slug: "cloud" },
];

async function seed() {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
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

    // Seed Users (10人)
    console.info("👤 Creating users...");
    const userData = Array.from({ length: 10 }, (_, i) => ({
      id: crypto.randomUUID(),
      name: `${randomPick(firstNames)} ${randomPick(lastNames)}`,
      email: `user${i + 1}@example.com`,
      emailVerified: Math.random() > 0.3,
      image: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    }));

    const createdUsers = await db.insert(user).values(userData).returning();
    console.info(`✅ Created ${createdUsers.length} users`);

    // Seed Tags (15個)
    console.info("🏷️  Creating tags...");
    const createdTags = await db.insert(tags).values(tagData).returning();
    console.info(`✅ Created ${createdTags.length} tags`);

    // Seed Articles (100件)
    console.info("📝 Creating articles...");
    const articleData = Array.from({ length: 100 }, (_, i) => {
      const title = generateTitle();
      const status = randomPick([
        "published",
        "published",
        "published",
        "draft",
      ] as const);
      const author = randomPick(createdUsers);

      const payload: ArticleInsertPayload = {
        id: crypto.randomUUID(),
        slug: generateSlug(title, i + 1),
        title,
        content: generateContent(title),
        coverImageUrl: `https://picsum.photos/seed/article${i + 1}/800/400`,
        authorId: author.id,
        status,
      };

      // スキーマでバリデーション（変更があればエラーになる）
      const validated = v.parse(articleSchema.insert, payload);

      return {
        ...validated,
        publishedAt: status === "published" ? randomDate(90) : null,
      };
    });

    const createdArticles = await db
      .insert(articles)
      .values(articleData)
      .returning();
    console.info(`✅ Created ${createdArticles.length} articles`);

    // Seed Article Tags (各記事に1-4個のタグ)
    console.info("🔗 Creating article-tag relationships...");
    const articleTagData: { articleId: string; tagId: string }[] = [];

    for (const article of createdArticles) {
      const tagCount = Math.floor(Math.random() * 4) + 1;
      const selectedTags = randomPickMultiple(createdTags, tagCount);

      for (const tag of selectedTags) {
        articleTagData.push({
          articleId: article.id,
          tagId: tag.id,
        });
      }
    }

    await db.insert(articleTags).values(articleTagData);
    console.info(
      `✅ Created ${articleTagData.length} article-tag relationships`,
    );

    // Seed Article Likes (各記事に0-5個のいいね)
    console.info("❤️  Creating article likes...");
    const articleLikeData: { articleId: string; userId: string }[] = [];
    const likeSet = new Set<string>();

    for (const article of createdArticles) {
      // 記事の作者以外からランダムにいいね
      const otherUsers = createdUsers.filter((u) => u.id !== article.authorId);
      const likeCount = Math.floor(Math.random() * 6);
      const likers = randomPickMultiple(otherUsers, likeCount);

      for (const liker of likers) {
        const key = `${article.id}-${liker.id}`;
        if (!likeSet.has(key)) {
          likeSet.add(key);
          articleLikeData.push({
            articleId: article.id,
            userId: liker.id,
          });
        }
      }
    }

    if (articleLikeData.length > 0) {
      await db.insert(articleLikes).values(articleLikeData);
    }
    console.info(`✅ Created ${articleLikeData.length} article likes`);

    // サマリー計算
    const publishedCount = createdArticles.filter(
      (a) => a.status === "published",
    ).length;
    const draftCount = createdArticles.filter(
      (a) => a.status === "draft",
    ).length;

    console.info("\n🎉 Seed completed successfully!");
    console.info("\n📊 Summary:");
    console.info(`   Users: ${createdUsers.length}`);
    console.info(
      `   Articles: ${createdArticles.length} (${publishedCount} published, ${draftCount} draft)`,
    );
    console.info(`   Tags: ${createdTags.length}`);
    console.info(`   Article-Tag relations: ${articleTagData.length}`);
    console.info(`   Likes: ${articleLikeData.length}`);
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
