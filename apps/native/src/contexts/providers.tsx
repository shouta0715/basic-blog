import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";
import { SplashScreenController } from "./splash-screen-controller";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaListener
    onChange={({ insets }) => {
      Uniwind.updateInsets(insets);
    }}
  >
    <SplashScreenController>{children}</SplashScreenController>
  </SafeAreaListener>
);
