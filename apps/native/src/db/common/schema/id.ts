import * as v from "valibot";

export const idSchema = v.optional(v.pipe(v.string(), v.uuid()), () =>
  crypto.randomUUID(),
);
