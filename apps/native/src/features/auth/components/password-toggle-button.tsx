import { Button } from "heroui-native";
import { EyeIcon } from "@/components/icons/eye";
import { EyeSlashIcon } from "@/components/icons/eye-slash";

type Props = {
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
};

export function PasswordToggleButton({
  isPasswordVisible,
  togglePasswordVisibility,
}: Props) {
  return (
    <Button
      isIconOnly
      aria-label={
        isPasswordVisible ? "パスワードを非表示にする" : "パスワードを表示する"
      }
      size="sm"
      variant="ghost"
      onPress={togglePasswordVisibility}
    >
      {isPasswordVisible ? (
        <EyeIcon aria-hidden />
      ) : (
        <EyeSlashIcon aria-hidden />
      )}
    </Button>
  );
}
