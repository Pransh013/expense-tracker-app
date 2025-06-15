import { RootLayoutWrapper } from "@/components/RootLayoutWrapper";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <RootLayoutWrapper>
        <Slot />
      </RootLayoutWrapper>
    </ClerkProvider>
  );
}
