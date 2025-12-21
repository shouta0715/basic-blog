import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthenticatedLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
            paddingBottom: insets.bottom,
            paddingTop: insets.top,
          },
        }}
      />
    </Stack>
  );
}
