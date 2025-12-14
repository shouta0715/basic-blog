import { valibotResolver } from "@hookform/resolvers/valibot";
import { userSchema } from "@package/lib";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/toast";
import { getAuthErrorInfo } from "@/features/errors/auth/get-auth-error-info";
import { authClient } from "@/lib/auth-client";

export function useSignUpForm() {
  const { toast } = useToast();
  const router = useRouter();

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

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) {
        const errorInfo = getAuthErrorInfo(error.code);
        toast.error({
          label: errorInfo.label,
          description: errorInfo.description,
        });
        console.error(error);

        return;
      }

      toast.success({
        label: "登録が完了しました",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error({
        label: "不明なエラー",
        description: `エラーが発生しました。\n時間をおいて再度お試しください。`,
      });
    }
  });

  return { form, handleSubmit, isPasswordVisible, togglePasswordVisibility };
}
