import { useApi } from "./axios";

export const apiClient = () => {
  const axiosInstance = useApi();

  return {
    transactions: {
      create: async (data: any) => {
        const response = await axiosInstance.post("/transactions", data);
        return response.data;
      },

      getAll: async () => {
        const response = await axiosInstance.get("/transactions");
        return response.data;
      },

      getSummary: async () => {
        const response = await axiosInstance.get("/transactions/summary");
        return response.data;
      },

      delete: async (id: string) => {
        const response = await axiosInstance.delete(`/transactions/${id}`);
        return response.data;
      },
    },
  };
};
