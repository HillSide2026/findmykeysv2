import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import apiClient from "./client";
/**
 * Converts a base64 string to a Blob object.
 *
 * @param {string} base64String - The base64 string to convert.
 * @param {string} [type="image/png"] - The MIME type of the Blob.
 * @returns {Blob} - The resulting Blob object.
 */
const base64ToBlob = (
  base64String: string,
  type: string = "image/png"
): Blob => {
  const byteCharacters = atob(base64String.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type });
};

/**
 * Sends audio and image data to the backend server.
 *
 * @param {string} audioUri - The URI of the audio file to upload.
 * @param {string} imageUri - The URI of the image file to upload.
 * @returns {Promise<any>} - A promise that resolves with the server response.
 */
export const sendDataToBackend = async (
  transcription: string,
  imageUri: string
): Promise<any> => {
  /**
   * Uploads the files to the backend server.
   *
   * @returns {Promise<any>} - A promise that resolves with the server response.
   */
  const uploadFiles = async (): Promise<any> => {
    if (!transcription || !imageUri) {
      console.error("Both audio and photo must be provided for upload.");
      return;
    }
    console.log("Transcription in imageAnalysis:", transcription);
    const data = new FormData();

    try {
      if (Platform.OS === "web") {
        // For web, convert the base64 image directly to Blob
        const imageBlob = base64ToBlob(imageUri, "image/png");

        data.append("image", imageBlob, "photo.png");
        data.append("transcription", transcription);
      } else {
        // For mobile (iOS/Android), handle audio and image URIs directly
        const imageInfo = await FileSystem.getInfoAsync(imageUri);

        data.append("image", {
          uri: imageInfo.uri,
          name: "photo.jpg",
          type: "image/jpeg",
        } as unknown as Blob);

        data.append("transcription", transcription);
      }

      const response = await apiClient.post("/directions", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      return { message: "Upload failed" };
    }
  };

  return uploadFiles();
};
