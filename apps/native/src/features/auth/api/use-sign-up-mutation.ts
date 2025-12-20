import { UserSignUpSchema } from "@package/lib";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCommonAuthError } from "../hooks/use-common-auth-error";
import { useToast } from "@/components/toast";
import { authClient } from "@/lib/auth-client";
import { notificationHaptics } from "@/lib/haptics";

export function useSignUpMutation() {
  const { toast } = useToast();
  const { handleAuthError } = useCommonAuthError();

  const { mutate, status } = useMutation({
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
    onError: handleAuthError,
  });

  return { mutate, status };
}
