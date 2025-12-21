import { authClient } from "@/lib/auth-client";

export type AuthErrorCodes = keyof typeof authClient.$ERROR_CODES;

export const authErrorMap = {
  USER_NOT_FOUND: {
    label: "ユーザーが見つかりません",
    description: "指定されたユーザーは存在しません。",
  },
  FAILED_TO_CREATE_USER: {
    label: "ユーザー作成に失敗しました",
    description:
      "アカウントの作成中にエラーが発生しました。もう一度お試しください。",
  },
  FAILED_TO_CREATE_SESSION: {
    label: "ログインに失敗しました",
    description:
      "セッションの作成中にエラーが発生しました。もう一度お試しください。",
  },
  FAILED_TO_UPDATE_USER: {
    label: "更新に失敗しました",
    description: "ユーザー情報の更新中にエラーが発生しました。",
  },
  FAILED_TO_GET_SESSION: {
    label: "セッションの取得に失敗しました",
    description:
      "ログイン状態を確認できませんでした。再度ログインしてください。",
  },
  INVALID_PASSWORD: {
    label: "パスワードが正しくありません",
    description: "入力されたパスワードが間違っています。",
  },
  INVALID_EMAIL: {
    label: "メールアドレスが無効です",
    description: "正しいメールアドレスを入力してください。",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    label: "認証に失敗しました",
    description: "メールアドレスまたはパスワードが正しくありません。",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    label: "アカウントは既に連携済みです",
    description:
      "このソーシャルアカウントは既に別のアカウントに連携されています。",
  },
  PROVIDER_NOT_FOUND: {
    label: "プロバイダーが見つかりません",
    description: "指定された認証プロバイダーは利用できません。",
  },
  INVALID_TOKEN: {
    label: "トークンが無効です",
    description: "認証トークンが無効または期限切れです。再度お試しください。",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    label: "IDトークンがサポートされていません",
    description: "このプロバイダーではIDトークン認証は利用できません。",
  },
  FAILED_TO_GET_USER_INFO: {
    label: "ユーザー情報の取得に失敗しました",
    description: "ソーシャルアカウントからユーザー情報を取得できませんでした。",
  },
  USER_EMAIL_NOT_FOUND: {
    label: "メールアドレスが見つかりません",
    description: "このアカウントにはメールアドレスが登録されていません。",
  },
  EMAIL_NOT_VERIFIED: {
    label: "メールアドレスが未確認です",
    description:
      "メールアドレスの確認が完了していません。確認メールをご確認ください。",
  },
  PASSWORD_TOO_SHORT: {
    label: "パスワードが短すぎます",
    description: "パスワードは8文字以上で設定してください。",
  },
  PASSWORD_TOO_LONG: {
    label: "パスワードが長すぎます",
    description: "パスワードは128文字以内で設定してください。",
  },
  USER_ALREADY_EXISTS: {
    label: "ユーザーは既に存在します",
    description: "このメールアドレスは既に登録されています。",
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    label: "このメールアドレスは使用できません",
    description: "別のメールアドレスで登録してください。",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    label: "メールアドレスを変更できません",
    description: "メールアドレスの変更は許可されていません。",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    label: "アカウントが見つかりません",
    description:
      "メールアドレスとパスワードで登録されたアカウントが見つかりません。",
  },
  SESSION_EXPIRED: {
    label: "セッションが期限切れです",
    description: "セッションの有効期限が切れました。再度ログインしてください。",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    label: "連携解除に失敗しました",
    description:
      "最後の認証方法は解除できません。別の認証方法を追加してから解除してください。",
  },
  ACCOUNT_NOT_FOUND: {
    label: "アカウントが見つかりません",
    description: "指定されたアカウントは存在しません。",
  },
  USER_ALREADY_HAS_PASSWORD: {
    label: "パスワードは既に設定されています",
    description: "このアカウントには既にパスワードが設定されています。",
  },
} as const satisfies Record<
  AuthErrorCodes,
  { label: string; description: string }
>;
