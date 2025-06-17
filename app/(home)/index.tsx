import { ScrollView } from "react-native";
import { Header } from "@/components/Header";
import { styles } from "@/styles/home.styles";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header />
    </ScrollView>
  );
}
