import { Stack, useRouter } from "expo-router";
import { Button } from "heroui-native";
import React from "react";
import { ChevronLeftIcon } from "@/components/icons/chevron-left";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="sign-in" options={{ animation: "none", title: "" }} />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "",
          headerLeft: () => (
            <Button
              isIconOnly
              aria-label="Close"
              size="sm"
              variant="ghost"
              onPress={() => router.back()}
            >
              <ChevronLeftIcon />
            </Button>
          ),
          presentation: "card",
        }}
      />
    </Stack>
  );
}
