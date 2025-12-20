import { UserSignInSchema } from "@package/lib";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useToast } from "@/components/toast";
import { getAuthErrorInfo } from "@/features/errors/auth/get-auth-error-info";
import { authClient } from "@/lib/auth-client";
import { notificationHaptics } from "@/lib/haptics";

export function useSignInMutation() {
  const { toast } = useToast();

  const { mutate, status } = useMutation({
    mutationFn: async (data: UserSignInSchema) => {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      notificationHaptics.success();
      toast.success({
        label: "ログインしました",
      });
      router.push("/");
    },
    onError: (error) => {
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
    },
  });

  return { mutate, status };
}
