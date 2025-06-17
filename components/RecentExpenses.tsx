import { View, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/home.styles";
import TransactionItem from "./TransactionItem";
import { Transaction } from "@/types";

const EmptyState = () => (
  <View style={styles.emptyState}>
    <Ionicons name="receipt-outline" size={48} color="#ccc" />
    <Text style={styles.emptyText}>No transactions yet</Text>
  </View>
);

export const RecentExpenses = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <View style={styles.expenseContainer}>
      <View style={styles.expenseHeader}>
        <Text style={styles.title}>Recent Transactions</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={EmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          transactions.length === 0 ? { flex: 1 } : undefined
        }
      />
    </View>
  );
};
