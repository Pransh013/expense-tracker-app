import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/auth.styles";

export const GoogleAuthButton = ({
  onPress,
  disabled,
}: {
  onPress: () => Promise<void>;
  disabled?: boolean;
}) => {
  return (
    <View>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={onPress}
        disabled={disabled}
      >
        <Ionicons name="logo-google" size={20} color="#4285F4" />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};
