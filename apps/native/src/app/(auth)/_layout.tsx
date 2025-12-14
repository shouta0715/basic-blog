import { Stack, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerShadowVisible: false,
        headerTitle: (props) => (
          <Text className="text-lg font-bold">{props.children}</Text>
        ),
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{ animation: "none", title: "Sign In" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Text>Close</Text>
            </Pressable>
          ),
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
}
