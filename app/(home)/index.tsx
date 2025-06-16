import { FlatList, Text, View } from "react-native";
import { useEffect } from "react";
import { useTransactions } from "@/hooks/useTransactions";

export default function Page() {
  const { getSummary, getTransactions, summary, transactions } =
    useTransactions();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getSummary(), getTransactions()]);
    };

    fetchData();
  }, [getSummary, getTransactions]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text>Total Income: ₹{summary?.totalIncome ?? 0}</Text>
        <Text>Total Expense: ₹{summary?.totalExpense ?? 0}</Text>
        <Text>Balance: ₹{summary?.balance ?? 0}</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#ccc",
              marginBottom: 10,
            }}
          >
            <Text>{item.category}</Text>
            <Text>{item.amount}</Text>
            <Text>{item.type}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}
