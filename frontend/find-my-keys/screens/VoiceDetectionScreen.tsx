import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import CameraComponent from "../components/CameraComponent";
import Modal from "react-native-modal";
import * as Speech from "expo-speech";
import CameraAPI from "../services/CameraAPI";
import { sendDataToBackend } from "../services/imageAnalysis";
import styles from "../styles/voiceDetection";
// import Transcriber from "../components/Transcriber";
import Toast from "react-native-root-toast";

// Buracks Component
const VoiceDetectionScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string>(""); // Captured image URI
  const [audio, setAudio] = useState<string>(""); // Recorded audio URI
  const [processedImage, setProcessedImage] = useState<string | null>(null); // Processed image
  const [backendResponse, setBackendResponse] = useState<string>(""); // Backend response
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Submission loader
  const [isLoading, setIsLoading] = useState<boolean>(false); // Image processing loader
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility

  const [transcription, setTranscription] = useState<string>(""); // New state for transcription

  // Handle image capture
  const handleImageCapture = (capturedImageUri: string) => {
    setImageUri(capturedImageUri);
    Toast.show("Image Captured!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
    setIsModalVisible(true);
  };

  // Handle audio capture
  const handleAudioCapture = (uri: string | null) => {
    if (!uri) {
      Toast.show("❗ No audio URI was provided.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      return;
    }

    setAudio(uri);
    console.log("Audio captured:", uri);
  };

  // Send captured image to the backend
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
      duration: Toast.durations.LONG,
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

  // Submit audio and image data to the backend
  const handleSubmit = async () => {
    if (!audio || !imageUri) {
      Toast.show("❗ Please record audio and capture an image first.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      return;
    }

    setIsSubmitting(true);
    const toastId = Toast.show("🔄 Uploading files...");
    try {
      const response = await sendDataToBackend(audio, imageUri);
      setBackendResponse(
        response?.message || "No message received or there was an error."
      );
      Toast.hide(toastId);
      Toast.show("Files uploaded successfully!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } catch (error) {
      Toast.hide(toastId);
      console.error("Error uploading files:", error);
      Toast.show("❗ Failed to upload files.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Speak the backend response
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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.cameraContainer}>
        <CameraComponent onImageCapture={handleImageCapture} />
      </View>

      {/* <View style={styles.voiceButtonContainer}>
        {isSubmitting ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Uploading files...</Text>
          </View>
        ) : (
          <Button title="Submit Data" onPress={handleSubmit} />
        )}
        <AudioRecorder onRecordingSaved={handleAudioCapture} />
      </View> */}
      {/* <Transcriber transcriptionSave={setTranscription} /> */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Image
            source={{ uri: processedImage || imageUri }}
            style={styles.capturedImage}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setImageUri("");
                setProcessedImage(null);
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[
                styles.button,
                imageUri && !isLoading ? {} : styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!imageUri || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Processing..." : "Continue with Audio"}
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[
                styles.button,
                imageUri && !isLoading ? {} : styles.buttonDisabled,
              ]}
              onPress={handleSendImage}
              disabled={!imageUri || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Processing..." : "Process Image"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {backendResponse && (
        <View style={styles.buttonContainer}>
          <Button title="Voice Response" onPress={speakResponse} />
        </View>
      )}
    </ScrollView>
  );
};

export default VoiceDetectionScreen;
