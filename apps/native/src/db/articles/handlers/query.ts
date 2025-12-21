import { articleSchema } from "@package/lib";
import { QueryFunctionContext } from "@tanstack/react-query";
import * as v from "valibot";
import { env } from "@/env/client";
import { handleApiResponse } from "@/lib/api-response";
import { authFetch } from "@/lib/auth-client";

export const queryArticleHandler = async (
  _: QueryFunctionContext<string[]>,
) => {
  const response = await authFetch(`${env.EXPO_PUBLIC_API_URL}/articles`);

  return handleApiResponse(response, v.array(articleSchema));
};
