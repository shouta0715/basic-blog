import * as v from "valibot";
import { idSchema } from "./id";

const userSchemaValue = v.object({
  id: idSchema,
  name: v.pipe(v.string(), v.minLength(1, "名前は1文字以上で入力してください")),
  email: v.pipe(v.string(), v.email("正しいメールアドレスを入力してください")),
  emailVerified: v.boolean(),
  image: v.nullable(v.pipe(v.string(), v.url())),
  createdAt: v.string(),
  updatedAt: v.string(),
});

export type User = v.InferOutput<typeof userSchemaValue>;

// 認証用スキーマ
const signUpSchema = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      v.minLength(1, "名前は1文字以上で入力してください"),
    ),
    email: v.pipe(
      v.string(),
      v.email("正しいメールアドレスを入力してください"),
    ),
    password: v.pipe(
      v.string(),
      v.minLength(8, "パスワードは8文字以上で入力してください"),
    ),
    confirmPassword: v.pipe(
      v.string(),
      v.minLength(8, "パスワードは8文字以上で入力してください"),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "パスワードが一致しません。",
    ),
    ["confirmPassword"],
  ),
);

const signInSchema = v.object({
  email: v.pipe(v.string(), v.email("正しいメールアドレスを入力してください")),
  password: v.pipe(
    v.string(),
    v.minLength(8, "パスワードは8文字以上で入力してください"),
  ),
});

type UserSignUpSchema = v.InferInput<typeof signUpSchema>;
type UserSignInSchema = v.InferInput<typeof signInSchema>;

const userSchema = {
  signUp: signUpSchema,
  signIn: signInSchema,
  value: userSchemaValue,
};

export { userSchema };
export type { UserSignUpSchema, UserSignInSchema };
