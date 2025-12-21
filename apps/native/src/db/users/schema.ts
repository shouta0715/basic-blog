import * as v from "valibot";
import { idSchema } from "../common/schema/id";

export const userSchema = v.object({
  id: idSchema,
  name: v.pipe(v.string(), v.minLength(1, "名前は1文字以上で入力してください")),
  email: v.pipe(v.string(), v.email("正しいメールアドレスを入力してください")),
  emailVerified: v.boolean(),
  image: v.nullable(v.pipe(v.string(), v.url())),
  createdAt: v.string(),
  updatedAt: v.string(),
});

export type User = v.InferOutput<typeof userSchema>;
