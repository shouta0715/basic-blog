import { Stack, useRouter } from "expo-router";
import { Button } from "heroui-native";
import React from "react";
import { Text } from "react-native";
import { ChevronLeftIcon } from "@/components/icons/chevron-left";

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
      <Stack.Screen name="sign-in" options={{ animation: "none" }} />
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
