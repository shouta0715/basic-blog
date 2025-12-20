import { parseSchema } from "@package/lib";
import type { GenericSchema } from "valibot";
import * as v from "valibot";
import { createHttpError } from "./errors/api";

export const handleApiResponse = async <T extends GenericSchema>(
  response: Response,
  schema: T,
): Promise<v.InferOutput<T>> => {
  if (!response.ok) {
    throw createHttpError(response.status, response.statusText);
  }

  const data = await response.json();

  return parseSchema(schema, data);
};
