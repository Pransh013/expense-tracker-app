import { View, Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { SignOutButton } from "./SignOutButton";
import { AddTransactionButton } from "./AddTransactionButton";
import { styles } from "@/styles/home.styles";

export const Header = () => {
  const { user } = useUser();

  return (
    <View style={styles.header}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName?.[0] ||
              user?.emailAddresses[0]?.emailAddress[0] ||
              "U"}
          </Text>
        </View>
        <View>
          <Text style={styles.greeting}>Welcome</Text>
          <Text style={styles.name}>
            {user?.firstName ||
              user?.emailAddresses[0].emailAddress.split("@")[0] ||
              "User"}
          </Text>
        </View>
      </View>
      <View style={styles.buttonsSection}>
        <AddTransactionButton />
        <SignOutButton />
      </View>
    </View>
  );
};
