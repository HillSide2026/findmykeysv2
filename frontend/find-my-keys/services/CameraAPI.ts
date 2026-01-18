// services/CameraAPI.ts
import apiClient from "./client";
import { AxiosResponse } from "axios";

/**
 * Converts a base64 string to a Blob.
 *
 * @param {string} base64String - The base64 encoded string.
 * @param {string} type - The MIME type of the blob.
 * @returns {Blob} - The Blob object created from the base64 string.
 */
function base64ToBlob(base64String: string, type: string): Blob {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  return new Blob([byteNumbers], { type });
}

interface ImageResponse {
  processed_image_base64: string | null;
}

/**
 * Sends an image to the backend for processing.
 *
 * @param {string} imageUri - The URI of the image.
 * @returns {Promise<string | null>} - The processed image as a base64 string, or null if not provided.
 * @throws {Error} - Throws error if the image URI is invalid or the request fails.
 */
async function sendImageToBackend(imageUri: string): Promise<string | null> {
  if (!imageUri) {
    throw new Error("No image URI provided");
  }

  const formData = new FormData();
  let blob: Blob | null = null;
  const imageType = "image/jpeg";

  if (imageUri.startsWith("data:image/")) {
    const parts = imageUri.split(",");
    if (parts.length === 2) {
      const mimeType = "image/png";
      const base64String = parts[1];
      blob = base64ToBlob(base64String, mimeType);
    }
  } else if (imageUri.startsWith("file://")) {
    const file = {
      uri: imageUri,
      type: imageType,
      name: "photo.jpg",
    };
    formData.append("file", file as any);
  }

  if (blob) {
    formData.append("file", blob, "photo.png");
  }

  try {
    const response: AxiosResponse<ImageResponse> = await apiClient.post("/detect", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.processed_image_base64 || null;
  } catch (error) {
    console.error("Error sending image to backend:", error);
    throw error;
  }
}

export default {
  base64ToBlob,
  sendImageToBackend,
};
