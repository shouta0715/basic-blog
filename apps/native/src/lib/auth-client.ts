import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { env } from "@/env/client";

const betterAuthClient = createAuthClient({
  baseURL: env.EXPO_PUBLIC_API_URL,
  plugins: [
    expoClient({
      scheme: "basic-blog",
      storagePrefix: "basic-blog",
      storage: SecureStore,
    }),
  ],
});

export const authClient = betterAuthClient;

export const { useSession } = betterAuthClient;

export function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const cookies = authClient.getCookie();
  const headers = {
    Cookie: cookies,
  };

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      ...headers,
    },
    credentials: "omit",
  });
}

export function useCurrentUser() {
  const { data: session } = useSession();

  if (!session) {
    throw new Error("User not found");
  }

  return session.user;
}
