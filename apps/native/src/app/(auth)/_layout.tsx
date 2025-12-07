import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" options={{ animation: "none" }} />
      <Stack.Screen name="sign-up" options={{ animation: "none" }} />
    </Stack>
  );
}
