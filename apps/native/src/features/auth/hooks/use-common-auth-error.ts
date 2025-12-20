import { useToast } from "@/components/toast";
import { getAuthErrorInfo } from "@/features/errors/auth/get-auth-error-info";
import { notificationHaptics } from "@/lib/haptics";

export function useCommonAuthError() {
  const { toast } = useToast();

  const handleAuthError = (error: Error) => {
    console.error(error);

    notificationHaptics.error();

    if ("code" in error && typeof error.code === "string") {
      const errorInfo = getAuthErrorInfo(error.code);
      toast.error({
        label: errorInfo.label,
        description: errorInfo.description,
      });
    } else {
      toast.error({
        label: "不明なエラー",
        description: `エラーが発生しました。\n時間をおいて再度お試しください。`,
      });
    }
  };

  return {
    handleAuthError,
  };
}
