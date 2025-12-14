import { Redirect, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
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
      <Pressable
        className="rounded-md border border-gray-100 p-2"
        onPress={() => router.push("/sign-up")}
      >
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  );
}
