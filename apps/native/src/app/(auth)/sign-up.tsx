import { Redirect } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/lib/auth-client";

export default function SignUp() {
  const { data: session } = useSession();

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView>
      <Text>Sign In</Text>
    </SafeAreaView>
  );
}
