import { Redirect, useRouter } from "expo-router";
import { Button } from "heroui-native";
import { Text, View } from "react-native";
import { useSession } from "@/lib/auth-client";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Sign In</Text>
      <Button
        size="sm"
        variant="danger"
        onPress={() => router.push("/sign-up")}
      >
        <Button.Label>Sign Up</Button.Label>
      </Button>
    </View>
  );
}
