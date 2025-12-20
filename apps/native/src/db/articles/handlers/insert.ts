import { Article, articleSchema } from "@package/lib";
import { InsertMutationFn } from "@tanstack/react-db";
import { env } from "@/env/client";
import { handleApiResponse } from "@/lib/api-response";
import { authFetch } from "@/lib/auth-client";

export const insertArticleHandler: InsertMutationFn<Article> = async ({
  transaction,
}) => {
  const newItems = transaction.mutations.map((mutation) => mutation.modified);
  const response = await Promise.all(
    newItems.map(async (item) => {
      const res = await authFetch(`${env.EXPO_PUBLIC_API_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      return handleApiResponse(res, articleSchema);
    }),
  );

  return response;
};
