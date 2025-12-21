import * as v from "valibot";
export const boolResultSchema = v.object({
  success: v.boolean(),
});

export type BoolResult = v.InferOutput<typeof boolResultSchema>;
