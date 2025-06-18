import { styles } from "@/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export const AddTransactionButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/create")}
      style={styles.addButton}
    >
      <Ionicons name="add" size={24} color="#fff" />
      <Text style={styles.addButtonText}>Add</Text>
    </TouchableOpacity>
  );
};
