import "@/tailwind.css";
import "react-native-random-uuid";

import { Stack } from "expo-router";
import { Providers } from "@/contexts/providers";
import { useSession } from "@/lib/auth-client";

export default function RootLayout() {
  const { data: session } = useSession();

  return (
    <Providers>
      <Stack>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>

        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </Providers>
  );
}
