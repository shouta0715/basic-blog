import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useSession } from "@/lib/auth-client";

export default function SignUp() {
  const { data: session } = useSession();

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 px-4">
      <Text>Sign Up</Text>
    </View>
  );
}
