import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api";
import {
  CreateTransactionData,
  Transaction,
  TransactionSummary,
} from "@/types";

export const useTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);

  const api = apiClient();

  const withLoading = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T> => {
      try {
        setLoading(true);
        setError(null);
        return await fn();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getTransactions = useCallback(async (): Promise<Transaction[]> => {
    return await withLoading(async () => {
      const result = await api.transactions.getAll();
      setTransactions(result.transactions);
      return result.transactions;
    });
  }, [api, withLoading]);

  const getSummary = useCallback(async (): Promise<TransactionSummary> => {
    return await withLoading(async () => {
      const result = await api.transactions.getSummary();
      setSummary(result.summary);
      return result.summary;
    });
  }, [api, withLoading]);

  const createTransaction = useCallback(
    async (data: CreateTransactionData) => {
      return await withLoading(async () => {
        const result = await api.transactions.create(data);
        await Promise.all([getTransactions(), getSummary()]);
        return result;
      });
    },
    [api, getTransactions, getSummary, withLoading]
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      return await withLoading(async () => {
        await api.transactions.delete(id);
        await Promise.all([getTransactions(), getSummary()]);
      });
    },
    [api, getTransactions, getSummary, withLoading]
  );

  return {
    transactions,
    summary,
    loading,
    error,
    getTransactions,
    getSummary,
    createTransaction,
    deleteTransaction,
  };
};
