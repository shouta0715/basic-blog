import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "../api/use-sign-in-mutation";
import { authSchema } from "../schema";
import { useCommonAuthError } from "./use-common-auth-error";
import { useToast } from "@/components/toast";
import { notificationHaptics } from "@/lib/haptics";

export function useSignInForm() {
  const { handleAuthError } = useCommonAuthError();
  const { toast } = useToast();
  const router = useRouter();

  const onSuccess = () => {
    notificationHaptics.success();
    toast.success({
      label: "ログインしました",
    });
    router.push("/");
  };

  const { mutate, status } = useSignInMutation({
    onSuccess,
    onError: handleAuthError,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const form = useForm({
    resolver: valibotResolver(authSchema.signIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => mutate(data));

  return {
    form,
    handleSubmit,
    isValid: form.formState.isValid,
    status,
    isPasswordVisible,
    togglePasswordVisibility,
  };
}
