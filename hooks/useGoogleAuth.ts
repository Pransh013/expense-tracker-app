import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export const useGoogleAuth = () => {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleAuth = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "expensetrackerapp",
          path: "oauth-callback",
        }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error("Google auth error:", err);
      throw err;
    }
  }, [startSSOFlow, router]);

  return { handleGoogleAuth };
};
