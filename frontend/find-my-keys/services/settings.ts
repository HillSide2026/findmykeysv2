import apiClient from "./client";

/**
 * Retrieves the user's current theme.
 *
 * @returns {Promise<any>} - The response from the API containing the current theme.
 */
export const getTheme = async (): Promise<any> => {
  try {
    const response = await apiClient.get("/theme");
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Updates the user's theme (light or dark).
 *
 * @param {string} theme - The theme to set (either "light" or "dark").
 * @returns {Promise<any>} - The response from the API containing success message.
 */
export const updateTheme = async (theme: string): Promise<any> => {
  try {
    const response = await apiClient.put("/theme", { theme });
    return response;
  } catch (error) {
    throw error;
  }
};
