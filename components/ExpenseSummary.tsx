import { styles } from "@/styles/home.styles";
import { TransactionSummary } from "@/lib/types";
import { View, Text } from "react-native";

export const ExpenseSummary = ({
  summary,
}: {
  summary: TransactionSummary | null;
}) => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₹{summary?.balance ?? 0}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: "#E3F2FD" }]}>
            <Text style={[styles.icon, { color: "#1976D2" }]}>↑</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={[styles.statAmount, { color: "#1976D2" }]}>
              ₹{summary?.totalIncome ?? 0}
            </Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.iconContainer, { backgroundColor: "#FFEBEE" }]}>
            <Text style={[styles.icon, { color: "#D32F2F" }]}>↓</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={[styles.statAmount, { color: "#D32F2F" }]}>
              ₹{summary?.totalExpense ?? 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
