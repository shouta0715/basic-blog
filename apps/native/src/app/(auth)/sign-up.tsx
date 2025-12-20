import { Link, Redirect } from "expo-router";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Text } from "@/components/native/text";
import { SignUpForm } from "@/features/auth/components/sing-up-form";
import { useSession } from "@/lib/auth-client";

export default function SignUp() {
  const { data: session } = useSession();

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <KeyboardAwareScrollView
      bottomOffset={100}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 gap-6 p-4">
        <Text bold className="text-center text-2xl">
          アカウントの作成
        </Text>
        <SignUpForm />
        <Text className="text-muted text-center text-sm">
          すでにアカウントをお持ちですか？
          <Link asChild href="..">
            <Text bold className="text-link">
              ログイン
            </Text>
          </Link>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
