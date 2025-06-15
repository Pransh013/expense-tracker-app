import { Text, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useUser } from "@clerk/clerk-expo";

export default function Page() {
  const { user } = useUser();

  return (
    <View>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <SignOutButton />
    </View>
  );
}
