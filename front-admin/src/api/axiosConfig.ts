import axios, { AxiosInstance } from "axios";
import store from "../state/store";
import { logout } from "../state/adminSlice";

export const useApi = (): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL:  "http://app.awafimill.com/",
    withCredentials: true,  
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error); // Log request error
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;

      // Check for 403 Forbidden
      if (response && response.status === 403) {
        console.error('403 error: Unauthorized access. Logging out.'); // Log specific error
        store.dispatch(logout());
        window.location.href = '/'; // Adjust the path if needed
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
