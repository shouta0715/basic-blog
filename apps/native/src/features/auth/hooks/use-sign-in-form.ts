import { valibotResolver } from "@hookform/resolvers/valibot";
import { userSchema } from "@package/lib";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "./use-sign-in-mutation";

export function useSignInForm() {
  const { mutate, status } = useSignInMutation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const form = useForm({
    resolver: valibotResolver(userSchema.signIn),
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
