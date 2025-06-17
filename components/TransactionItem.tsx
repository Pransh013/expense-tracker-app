import { styles } from "@/styles/home.styles";
import { ExpenseType, Transaction } from "@/types";
import { Text, View } from "react-native";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionInfo}>
      <Text style={styles.category}>{transaction.category}</Text>
      <Text style={styles.date}>
        {new Date(transaction.date).toLocaleDateString()}
      </Text>
    </View>
    <Text
      style={[
        styles.amount,
        {
          color:
            transaction.type === ExpenseType.INCOME ? "#1976D2" : "#D32F2F",
        },
      ]}
    >
      {transaction.type === ExpenseType.INCOME ? "+" : "-"}₹{transaction.amount}
    </Text>
  </View>
);

export default TransactionItem;
