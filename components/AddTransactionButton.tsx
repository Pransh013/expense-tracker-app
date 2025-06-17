import { styles } from "@/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export const AddTransactionButton = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.addButton}>
      <Ionicons name="add" size={24} color="#fff" />
      <Text style={styles.addButtonText}>Add</Text>
    </TouchableOpacity>
  );
};
