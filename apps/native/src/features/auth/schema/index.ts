import * as v from "valibot";

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

export const authSchema = {
  signUp: signUpSchema,
  signIn: signInSchema,
};

export type SignUpSchema = v.InferInput<typeof signUpSchema>;
export type SignInSchema = v.InferInput<typeof signInSchema>;
