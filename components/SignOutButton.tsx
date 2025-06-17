import { styles } from "@/styles/home.styles";
import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handlePress = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", style: "destructive", onPress: handleSignOut },
    ]);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={24} color="#000" />
    </TouchableOpacity>
  );
};
