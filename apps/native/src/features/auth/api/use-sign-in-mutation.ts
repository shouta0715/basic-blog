import { UserSignInSchema } from "@package/lib";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCommonAuthError } from "../hooks/use-common-auth-error";
import { useToast } from "@/components/toast";
import { authClient } from "@/lib/auth-client";
import { notificationHaptics } from "@/lib/haptics";

export function useSignInMutation() {
  const { handleAuthError } = useCommonAuthError();
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
    onError: handleAuthError,
  });

  return { mutate, status };
}
