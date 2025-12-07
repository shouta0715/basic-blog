import * as v from "valibot";

export const parseSchema = <
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  schema: v.BaseSchema<TInput, TOutput, TIssue>,
  data: unknown,
) => v.parse(schema, data);

export const safeParseSchema = <
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  schema: v.BaseSchema<TInput, TOutput, TIssue>,
  data: unknown,
) => v.safeParse(schema, data);
