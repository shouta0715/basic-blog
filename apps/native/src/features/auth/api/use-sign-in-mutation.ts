import { useMutation } from "@tanstack/react-query";
import { SignInSchema } from "../schema";
import { authClient } from "@/lib/auth-client";

type Props = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

export function useSignInMutation({ onSuccess, onError }: Props) {
  const { mutate, status } = useMutation({
    mutationFn: async (data: SignInSchema) => {
      const { error } = await authClient.signIn.email({
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
