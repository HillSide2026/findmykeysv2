import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

import CameraComponent from "../components/CameraComponent";
import { sendDataToBackend } from "../services/imageAnalysis";
import * as Speech from "expo-speech";
import styles from "../styles/cameraVoice";
import Modal from "react-native-modal";
import CameraAPI from "../services/CameraAPI";
import Transcriber from "../components/Transcriber";
import Toast from "react-native-root-toast";
/**
 * CameraVoiceScreen component allows users to capture audio and images,
 * and submit them to a backend service for processing.
 */

//Ivans component
const VoiceCommandScreen: React.FC = () => {
  // State variables
  const [audio, setAudio] = useState(""); // Stores the URI of the recorded audio
  const [imageUri, setImageUri] = useState<string>(""); // Stores the URI of the captured image
  const [backendResponse, setBackendResponse] = useState<string>(""); // Stores the response from the backend
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // New state for submission loading
  const [processedImage, setProcessedImage] = useState<string | null>(null); // Stores the processed image URI
  const [isLoading, setIsLoading] = useState<boolean>(false); // Indicates if an image is being processed
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Controls the visibility of the modal

  const [transcription, setTranscription] = useState<string>(""); // New state for transcription
  /**
   * Handles the audio capture by updating the audio state with the captured URI.
   * @param {string} uri - The URI of the recorded audio.
   */
  const handleAudioCapture = (uri: string) => {
    setAudio(uri);
    console.log("Transcribed uri:", uri);
  };

  /**
   * Handles the image capture by updating the imageUri state and showing an alert.
   * @param {string} capturedImageUri - The URI of the captured image.
   */
  const handleImageCapture = (capturedImageUri: string) => {
    setImageUri(capturedImageUri);
    Toast.show("Image Captured!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
    // setIsModalVisible(true);
  };

  /**
   * Submits the audio and image data to the backend.
   * Shows loading indicator during submission and alerts the user upon success or failure.
   */
  const handleSubmit = async () => {
    try {
      if (!transcription || !imageUri) {
        Toast.show("❗ Please record audio and capture an image first.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
        return;
      }

      setIsSubmitting(true); // Start loading

      const response = await sendDataToBackend(transcription, imageUri);
      setBackendResponse(
        response?.message || "No message received or there was an error."
      );

      Toast.show("Files uploaded successfully!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      Toast.show("❗ Failed to upload files.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } finally {
      setIsSubmitting(false); // Stop loading regardless of outcome
    }
  };

  /**
   * Speaks the backend response using the Expo Speech API.
   * Alerts the user if there is no response to speak.
   */
  const speakResponse = () => {
    if (backendResponse) {
      Speech.speak(backendResponse);
    } else {
      Toast.show("❗ There is no response yet.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  /**
   * Sends the captured image to the backend for processing.
   * Alerts the user upon success or failure.
   */
  const handleSendImage = async () => {
    if (!imageUri) {
      Toast.show("❗ Please capture an image first.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      return;
    }

    setIsLoading(true);
    const toastId = Toast.show("🔄 Processing image...", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
    try {
      const processedImageBase64 = await CameraAPI.sendImageToBackend(imageUri);
      Toast.hide(toastId);
      if (processedImageBase64) {
        setProcessedImage(`data:image/jpeg;base64,${processedImageBase64}`);
        Toast.show("Image processed successfully!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      } else {
        Toast.show("❗ No processed image received.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      }
    } catch (error) {
      Toast.hide(toastId);
      console.error("Error uploading image:", error);
      Toast.show("❗ Failed to process the image. Please try again.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraComponent onImageCapture={handleImageCapture} />
      </View>
      <Transcriber transcriptionSave={setTranscription} />

      {/* Submit button with loading state */}
      {isSubmitting ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.buttonText}>Uploading files...</Text>
        </View>
      ) : (
        <Button title="Submit" onPress={handleSubmit} disabled={isSubmitting} />
      )}

      {backendResponse && (
        <View style={styles.buttonContainer}>
          <Button title="Voice the Response" onPress={speakResponse} />
        </View>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Image source={{ uri: imageUri }} style={styles.capturedImage} />
          {processedImage && (
            <Image
              source={{ uri: processedImage }}
              style={styles.processedImage}
            />
          )}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setImageUri("");
                setProcessedImage(null);
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Capture Another Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                imageUri && !isLoading ? {} : styles.buttonDisabled,
              ]}
              onPress={handleSendImage}
              disabled={!imageUri || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Processing..." : "Submit Image"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VoiceCommandScreen;
