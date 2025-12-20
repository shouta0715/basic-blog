import { UserSignUpSchema } from "@package/lib";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

type Props = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

export function useSignUpMutation({ onSuccess, onError }: Props) {
  const { mutate, status } = useMutation({
    mutationFn: async (data: UserSignUpSchema) => {
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
