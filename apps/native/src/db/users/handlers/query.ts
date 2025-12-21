import { QueryFunctionContext } from "@tanstack/react-query";
import * as v from "valibot";
import { userSchema } from "../schema";
import { env } from "@/env/client";
import { handleApiResponse } from "@/lib/api-response";
import { authFetch } from "@/lib/auth-client";

export const queryUserHandler = async (_: QueryFunctionContext<string[]>) => {
  const response = await authFetch(`${env.EXPO_PUBLIC_API_URL}/users`);

  return handleApiResponse(response, v.array(userSchema));
};
