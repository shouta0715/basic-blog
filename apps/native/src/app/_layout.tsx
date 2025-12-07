import "@/tailwind.css";

import { Stack } from "expo-router";
import { Providers } from "@/contexts/providers";

export default function RootLayout() {
  return (
    <Providers>
      <Stack />
    </Providers>
  );
}
