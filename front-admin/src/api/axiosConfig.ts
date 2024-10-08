import axios, { AxiosInstance } from "axios";

// Custom hook for API calls
export const useApi = (): any => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
  });
return axiosInstance

};
