import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dotenv from "dotenv";

/**
 * Creates an Axios instance configured for API requests.
 *
 * @constant {AxiosInstance} apiClient - The Axios instance with default settings.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor to add JWT token to the Authorization header.
 *
 * @param {InternalAxiosRequestConfig} config - The Axios request configuration.
 * @returns {Promise<InternalAxiosRequestConfig>} - The modified request configuration.
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Check if the request is for the refresh endpoint
    if (config.url !== "/refresh") {
      // Set Authorization header if token exists
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle API responses and errors.
 *
 * @param {AxiosResponse} response - The Axios response object.
 * @returns {any} - The data from the response.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // if (error.response) {
    //   console.error("API Error:", error.response.data);
    //   console.error("Status Code:", error.response.status);
    // } else if (error.request) {
    //   console.error("API Error: No response received", error.request);
    // } else {
    //   console.error("API Error:", error.message);
    // }
    return Promise.reject(error);
  }
);

export default apiClient;
