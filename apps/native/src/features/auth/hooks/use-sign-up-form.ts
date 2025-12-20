import { valibotResolver } from "@hookform/resolvers/valibot";
import { userSchema } from "@package/lib";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "../api/use-sign-up-mutation";
import { useCommonAuthError } from "./use-common-auth-error";
import { useToast } from "@/components/toast";
import { notificationHaptics } from "@/lib/haptics";

export function useSignUpForm() {
  const { handleAuthError } = useCommonAuthError();
  const { toast } = useToast();
  const router = useRouter();

  const onSuccess = () => {
    notificationHaptics.success();
    toast.success({
      label: "登録が完了しました",
    });
    router.push("/");
  };

  const { mutate, status } = useSignUpMutation({
    onSuccess,
    onError: handleAuthError,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility =
    (field: "password" | "confirmPassword") => () =>
      setIsPasswordVisible((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));

  const form = useForm({
    resolver: valibotResolver(userSchema.signUp),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
