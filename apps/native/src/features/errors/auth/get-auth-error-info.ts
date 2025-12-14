import { authErrorMap } from "./error-map";

export const getAuthErrorInfo = (
  code?: string,
): { label: string; description: string } => {
  if (!code) {
    return { label: "不明なエラー", description: "エラーが発生しました。" };
  }

  if (code in authErrorMap) {
    return authErrorMap[code as keyof typeof authErrorMap];
  }

  return { label: "不明なエラー", description: "エラーが発生しました。" };
};
