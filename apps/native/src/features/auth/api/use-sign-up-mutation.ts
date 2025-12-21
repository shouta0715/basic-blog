import { useMutation } from "@tanstack/react-query";
import { SignUpSchema } from "../schema";
import { authClient } from "@/lib/auth-client";

type Props = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

export function useSignUpMutation({ onSuccess, onError }: Props) {
  const { mutate, status } = useMutation({
    mutationFn: async (data: SignUpSchema) => {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
    },
    onSuccess: onSuccess,
    onError: onError,
  });

  return { mutate, status };
}
