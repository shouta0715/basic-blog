import { valibotResolver } from "@hookform/resolvers/valibot";
import { userSchema } from "@package/lib";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "./use-sign-up-mutation";

export function useSignUpForm() {
  const { mutate, status, resetError } = useSignUpMutation();
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
    status,
    isPasswordVisible,
    togglePasswordVisibility,
    resetError,
  };
}
