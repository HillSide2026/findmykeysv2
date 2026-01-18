import apiClient from "./client";

/**
 * Creates a new user object.
 *
 * @param {string} type - The type of the object to create.
 * @param {string} name - The name of the object to create.
 * @returns {Promise<any>} - The response from the API containing success message.
 */
export const createObject = async (type: string, name: string): Promise<any> => {
  try {
    const response = await apiClient.post("/objects", { type, name });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves user objects.
 *
 * @returns {Promise<any>} - The response from the API containing the list of objects.
 */
export const getObjects = async (): Promise<any> => {
  try {
    const response = await apiClient.get("/objects");
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Updates an existing user object.
 *
 * @param {string} id - The ID of the object to update.
 * @param {string} type - The new type for the object.
 * @param {string} name - The new name for the object.
 * @returns {Promise<any>} - The response from the API containing success message.
 */
export const updateObject = async (id: string, type: string, name: string): Promise<any> => {
  try {
    const response = await apiClient.put("/objects", { id, type, name });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Uploads an image for a user's object.
 *
 * @param {string} objectId - The ID of the object to which the image will be uploaded.
 * @param {File} file - The image file to upload.
 * @returns {Promise<any>} - The response from the API containing the uploaded image's URL.
 */
export const uploadObjectImage = async (
  objectId: string,
  file: File
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", objectId);

    const response = await apiClient.post("/objects/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes an existing user object.
 *
 * @param {number} id - The ID of the object to delete.
 * @returns {Promise<any>} - The response from the API containing success message.
 */
export const deleteObject = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/objects/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
