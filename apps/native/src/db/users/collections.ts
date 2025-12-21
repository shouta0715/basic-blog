import { userSchema } from "@package/lib";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import {
  createCollection,
  createLiveQueryCollection,
  eq,
} from "@tanstack/react-db";
import { queryUserHandler } from "./handlers/query";
import { queryClient } from "@/lib/query-client";

export const userCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["users"],
    syncMode: "on-demand",
    queryFn: queryUserHandler,
    getKey: (user) => user.id,
    queryClient: queryClient,
    schema: userSchema.value,
  }),
);

export const currentUserCollection = (currentUserId: string) =>
  createLiveQueryCollection((q) =>
    q
      .from({ user: userCollection })
      .where(({ user }) => eq(user.id, currentUserId)),
  );
