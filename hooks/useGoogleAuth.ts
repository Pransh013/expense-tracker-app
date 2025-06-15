import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useGoogleAuth = () => {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleAuth = useCallback(
    async (setActive: (params: { session: string }) => Promise<void>) => {
      try {
        const { createdSessionId } = await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: "expensetrackerapp://oauth-callback",
        });
        if (createdSessionId) {
          await setActive({ session: createdSessionId });
          router.replace("/");
        }
      } catch (err) {
        throw err;
      }
    },
    [startSSOFlow, router]
  );

  return { handleGoogleAuth };
};
