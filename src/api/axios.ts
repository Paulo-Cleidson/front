import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API URL configurada:", API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
    headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  
  if (token) {
    // This is the correct way - axios handles object format
    config.headers = {
      ...config.headers,
      "Authorization": `Bearer ${token}`
    };
  }
  
  return config;
});

export default axiosInstance;
