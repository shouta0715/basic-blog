import { DeleteMutationFn } from "@tanstack/react-db";
import * as v from "valibot";
import { Article } from "../schema";
import { env } from "@/env/client";
import { handleApiResponse } from "@/lib/api-response";
import { authFetch } from "@/lib/auth-client";

export const deleteArticleHandler: DeleteMutationFn<Article> = async ({
  transaction,
}) => {
  const targetIds = transaction.mutations.map(
    (mutation) => mutation.modified.id,
  );
  const response = await Promise.all(
    targetIds.map(async (targetId) => {
      const res = await authFetch(
        `${env.EXPO_PUBLIC_API_URL}/articles/${targetId}`,
        {
          method: "DELETE",
        },
      );

      return handleApiResponse(res, v.object({ success: v.boolean() }));
    }),
  );

  return response;
};
