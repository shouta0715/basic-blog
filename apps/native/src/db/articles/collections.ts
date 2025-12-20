import { articleSchema } from "@package/lib";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import { deleteArticleHandler } from "./handlers/delete";
import { insertArticleHandler } from "./handlers/insert";
import { queryArticleHandler } from "./handlers/query";
import { updateArticleHandler } from "./handlers/update";
import { queryClient } from "@/lib/query-client";

export const articleCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["articles"],
    syncMode: "on-demand",
    queryFn: queryArticleHandler,
    onInsert: insertArticleHandler,
    onUpdate: updateArticleHandler,
    onDelete: deleteArticleHandler,
    getKey: (article) => article.id,
    queryClient: queryClient,
    schema: articleSchema,
  }),
);
