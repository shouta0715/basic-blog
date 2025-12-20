import { UserSignUpSchema } from "@package/lib";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/toast";
import { getAuthErrorInfo } from "@/features/errors/auth/get-auth-error-info";
import { authClient } from "@/lib/auth-client";
import { notificationHaptics } from "@/lib/haptics";

export function useSignUpMutation() {
  const { toast } = useToast();
  const timer = useRef<number | null>(null);

  const { mutate, status, reset } = useMutation({
    mutationFn: async (data: UserSignUpSchema) => {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      notificationHaptics.success();
      toast.success({
        label: "登録が完了しました",
      });
      router.push("/");
    },
    onError: (error) => {
      console.error(error);

      notificationHaptics.error();

      timer.current = setTimeout(() => {
        reset();
        timer.current = null;
      }, 3000);

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

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    [],
  );

  const resetError = () => {
    reset();
    timer.current = null;
  };

  return { mutate, status, resetError };
}
