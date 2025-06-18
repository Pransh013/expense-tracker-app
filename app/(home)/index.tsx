import { View, ActivityIndicator } from "react-native";
import { Header } from "@/components/Header";
import { styles } from "@/styles/home.styles";
import { ExpenseSummary } from "@/components/ExpenseSummary";
import { RecentExpenses } from "@/components/RecentExpenses";
import { useEffect, useState } from "react";
import { useApiClient } from "@/lib/api";
import { Transaction, TransactionSummary } from "@/lib/types";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const api = useApiClient();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [transactionsResult, summaryResult] = await Promise.all([
          api.transactions.getAll(),
          api.transactions.getSummary(),
        ]);
        setTransactions(transactionsResult.transactions);
        setSummary(summaryResult.summary);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [api]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ExpenseSummary summary={summary} />
      <RecentExpenses transactions={transactions} />
    </View>
  );
}
