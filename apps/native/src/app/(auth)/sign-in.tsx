import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { useSession } from "@/lib/auth-client";

export default function SignIn() {
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
        <Text className="text-center text-2xl font-bold">ログイン</Text>
        <SignInForm />
        <Text className="text-muted text-center text-sm">
          アカウントをお持ちでないですか？
          <Link asChild href="/sign-up">
            <Text className="text-link font-semibold">新規登録</Text>
          </Link>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
