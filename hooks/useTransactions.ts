import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api";

export const useTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const api = apiClient();

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.transactions.getAll();
      setTransactions(result.transactions);
      return result.transactions;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch transactions"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const getSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.transactions.getSummary();
      setSummary(result.summary);
      return result.summary;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch summary");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createTransaction = useCallback(
    async (data: any) => {
      try {
        setLoading(true);
        setError(null);
        const result = await api.transactions.create(data);
        await Promise.all([getTransactions(), getSummary()]);
        return result;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create transaction"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [api, getTransactions, getSummary]
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        await api.transactions.delete(id);
        await Promise.all([getTransactions(), getSummary()]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete transaction"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [api, getTransactions, getSummary]
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
