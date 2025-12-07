import * as v from "valibot";

const useSignUpSchema = v.pipe(
  v.object({
    name: v.string(),
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
    image: v.optional(v.pipe(v.string(), v.url("正しいURLを入力してください"))),
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

type UserSignUpSchema = v.InferInput<typeof useSignUpSchema>;
type UserSignInSchema = v.InferInput<typeof signInSchema>;

const userSchema = {
  signUp: useSignUpSchema,
  signIn: signInSchema,
};

export { userSchema };
export type { UserSignUpSchema, UserSignInSchema };
