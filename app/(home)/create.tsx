import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useApiClient } from "@/lib/api";
import { styles } from "@/styles/create.styles";
import { z } from "zod";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CreateTransaction, ExpenseType } from "@/lib/types";
import { createTransactionSchema } from "@/lib/schema";

export default function AddTransactionScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const api = useApiClient();
  const [formData, setFormData] = useState<CreateTransaction>({
    amount: 0,
    type: ExpenseType.EXPENSE,
    category: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      setError(null);
      const validatedData = createTransactionSchema.safeParse({
        ...formData,
        ...(formData.date && { date: formData.date }),
      });

      if (!validatedData.success) {
        setError(validatedData.error.errors[0].message);
        return;
      }

      setLoading(true);
      await api.transactions.create(validatedData.data);
      router.replace("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        console.error(error);
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(formData.date || new Date());
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setFormData({ ...formData, date: newDate });
    }
  };

  const onTimeChange = (_: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(formData.date || new Date());
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setFormData({ ...formData, date: newDate });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Transaction</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.form}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === ExpenseType.EXPENSE && {
                borderColor: "#ff3b30",
                backgroundColor:
                  formData.type === ExpenseType.EXPENSE
                    ? "#ff3b30"
                    : "transparent",
              },
            ]}
            onPress={() =>
              setFormData({ ...formData, type: ExpenseType.EXPENSE })
            }
          >
            <Text
              style={[
                styles.typeText,
                formData.type === ExpenseType.EXPENSE && {
                  color: "#fff",
                  fontWeight: "600",
                },
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === ExpenseType.INCOME && {
                borderColor: "#007AFF",
                backgroundColor:
                  formData.type === ExpenseType.INCOME
                    ? "#007AFF"
                    : "transparent",
              },
            ]}
            onPress={() =>
              setFormData({ ...formData, type: ExpenseType.INCOME })
            }
          >
            <Text
              style={[
                styles.typeText,
                formData.type === ExpenseType.INCOME && {
                  color: "#fff",
                  fontWeight: "600",
                },
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="decimal-pad"
            value={formData.amount.toString()}
            onChangeText={(text) =>
              setFormData({ ...formData, amount: parseFloat(text) || 0 })
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter category"
            value={formData.category}
            onChangeText={(text) =>
              setFormData({ ...formData, category: text })
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date & Time</Text>
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>
                {formData.date?.toLocaleDateString() || "Select Date"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text>
                {formData.date?.toLocaleTimeString() || "Select Time"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={formData.date || new Date()}
            mode="date"
            onChange={onDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={formData.date || new Date()}
            mode="time"
            onChange={onTimeChange}
          />
        )}

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Adding..." : "Add Transaction"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
