import { Button } from "heroui-native";
import { View } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Button size="sm" variant="danger" onPress={() => authClient.signOut()}>
        <Button.Label>Logout</Button.Label>
      </Button>
    </View>
  );
}
