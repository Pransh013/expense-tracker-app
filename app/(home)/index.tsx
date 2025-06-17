import { View } from "react-native";
import { Header } from "@/components/Header";
import { styles } from "@/styles/home.styles";
import { ExpenseSummary } from "@/components/ExpenseSummary";
import { useTransactions } from "@/hooks/useTransactions";
import { RecentExpenses } from "@/components/RecentExpenses";
import { useEffect, useRef } from "react";

export default function HomeScreen() {
  const { getSummary, getTransactions, summary, transactions, loading } =
    useTransactions();
  const initialLoadDone = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (loading || initialLoadDone.current) return;

      try {
        initialLoadDone.current = true;
        await Promise.all([getSummary(), getTransactions()]);
      } catch (error) {
        initialLoadDone.current = false;
      }
    };

    fetchData();
  }, [getSummary, getTransactions, loading]);

  return (
    <View style={styles.container}>
      <Header />
      <ExpenseSummary summary={summary} />
      <RecentExpenses transactions={transactions} />
    </View>
  );
}
