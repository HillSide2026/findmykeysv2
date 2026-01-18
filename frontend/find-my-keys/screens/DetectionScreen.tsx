import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import CameraComponent from "../components/CameraComponent";
import Modal from "react-native-modal";
import CameraAPI from "../services/CameraAPI";
import styles from "../styles/detection";
import Toast from "react-native-root-toast";

const DetectionScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string>("");
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleImageCapture = (capturedImageUri: string) => {
    setImageUri(capturedImageUri);
    setProcessedImage(null); // Reset processed image when new image is captured
    Toast.show("Image Captured!", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
    setIsModalVisible(true);
  };

  const handleSendImage = async () => {
    if (!imageUri) {
      Toast.show("❗ Please capture an image first.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      return;
    }

    setIsLoading(true);
    const toastId = Toast.show("🔄 Processing image...");
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
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.cameraContainer}>
        <CameraComponent onImageCapture={handleImageCapture} />
      </View>

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
    </ScrollView>
  );
};

export default DetectionScreen;
