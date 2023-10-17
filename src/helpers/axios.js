import { config } from "@/config/config";
import { store } from "@/redux/store";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: `${config.baseUrl}/v1` });

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState()?.authData?.authToken;
  if (config?.headers) config.headers.authorization = `Bearer ${token}`;
  return config;
});

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let response = null;
    // Handle any error that occurs during the request
    if (error.response) {
      response = error.response?.data;
      const status = error?.response?.status;
      if (status === 404) {
        window.location.reload();
      }
      console.log("Response Error:", error.response.data);
      console.log("Status:", error.response.status);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      response = error.request?.data;
      // The request was made but no response was received
      console.log("Request Error:", error.request);
    } else {
      response = error.message;
      // Something happened in setting up the request that triggered an Error
      console.log("Error:", error.message);
    }

    return Promise.reject(response);
  }
);

export default axiosInstance;
