import { HeroUINativeProvider } from "heroui-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";
import { TanstackQueryClientProvider } from "./query-clinet-provider";
import { SplashScreenController } from "./splash-screen-controller";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <TanstackQueryClientProvider>
    <KeyboardProvider>
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <HeroUINativeProvider>
            <SplashScreenController>{children}</SplashScreenController>
          </HeroUINativeProvider>
        </GestureHandlerRootView>
      </SafeAreaListener>
    </KeyboardProvider>
  </TanstackQueryClientProvider>
);
