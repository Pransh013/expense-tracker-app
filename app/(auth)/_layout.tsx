import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
          animation: "fade",
        }}
      />
    </Stack>
  );
}
