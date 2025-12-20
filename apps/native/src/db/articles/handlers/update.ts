import { Article, articleSchema } from "@package/lib";
import { UpdateMutationFn } from "@tanstack/react-db";
import { env } from "@/env/client";
import { handleApiResponse } from "@/lib/api-response";
import { authFetch } from "@/lib/auth-client";

export const updateArticleHandler: UpdateMutationFn<Article> = async ({
  transaction,
}) => {
  const updatedItems = transaction.mutations.map((mutation) => ({
    ...mutation.modified,
    id: mutation.original.id,
  }));

  const response = await Promise.all(
    updatedItems.map(async (updatedItem) => {
      const res = await authFetch(
        `${env.EXPO_PUBLIC_API_URL}/articles/${updatedItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        },
      );

      return handleApiResponse(res, articleSchema);
    }),
  );

  return response;
};
