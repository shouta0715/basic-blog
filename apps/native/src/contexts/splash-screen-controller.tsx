import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import zenKakuGothicNewBold from "../../assets/fonts/ZenKakuGothicNew-Bold.ttf";
import zenKakuGothicNewRegular from "../../assets/fonts/ZenKakuGothicNew-Regular.ttf";
import { useSession } from "@/lib/auth-client";

type Props = {
  children: React.ReactNode;
};

void SplashScreen.preventAutoHideAsync();
export const SplashScreenController = ({ children }: Props) => {
  const { isPending } = useSession();
  const [loaded] = useFonts({
    "ZenKakuGothicNew-Regular": zenKakuGothicNewRegular,
    "ZenKakuGothicNew-Bold": zenKakuGothicNewBold,
  });

  if (!isPending && loaded) {
    void SplashScreen.hideAsync();
  }

  return children;
};
