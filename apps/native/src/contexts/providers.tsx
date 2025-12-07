import { SplashScreenController } from "./splash-screen-controller";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <SplashScreenController>{children}</SplashScreenController>
);
