import apiClient from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Registers a new user.
 *
 * @param {string} email - The user's email.
 * @param {string} name - The user's name.
 * @param {string} password - The user's password.
 * @returns {Promise<any>} - The response from the API.
 */
export const register = async (
  email: string,
  name: string,
  password: string
): Promise<any> => {
  try {
    const response = await apiClient.post("/register", {
      email,
      name,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Logs in a user and returns access and refresh tokens.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<any>} - The response from the API containing tokens.
 */
export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await apiClient.post("/login", { email, password });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Refreshes the access token using a valid refresh token.
 *
 * @returns {Promise<any>} - The response from the API containing the new access token.
 */
export const refresh = async (): Promise<any> => {
  try {
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    // Set the Authorization header with the refresh token
    const response = await apiClient.post(
      "/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Logs out a user by adding the current token to the blacklist.
 *
 * @returns {Promise<any>} - The response from the API.
 */
export const logout = async (): Promise<any> => {
  try {
    const response = await apiClient.post("/logout");
    return response;
  } catch (error) {
    throw error;
  }
};
