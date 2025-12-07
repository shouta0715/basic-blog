import { SplashScreen } from "expo-router";
import { useSession } from "@/lib/auth-client";

type Props = {
  children: React.ReactNode;
};

void SplashScreen.preventAutoHideAsync();
export const SplashScreenController = ({ children }: Props) => {
  const { isPending } = useSession();

  if (!isPending) {
    void SplashScreen.hideAsync();
  }

  return children;
};
