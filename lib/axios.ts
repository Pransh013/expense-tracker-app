import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";

const API_URL = "http://192.168.29.41:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isInterceptorSet = false;

export const useApi = () => {
  const { getToken } = useAuth();

  if (!isInterceptorSet) {
    axiosInstance.interceptors.request.use(async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
      return config;
    });
    isInterceptorSet = true;
  }

  return axiosInstance;
};
