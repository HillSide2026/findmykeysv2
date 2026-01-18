import React, { useState } from "react";
import { View, Image, SafeAreaView, StatusBar } from "react-native";
import AutoCameraComponent from "../components/AutoCameraComponent";
import CameraAPI from "../services/CameraAPI";
import styles from "../styles/liveDetection";
import Toast from "react-native-root-toast";

const LiveDetectionScreen: React.FC = () => {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);

  const handleImageCapture = async (uri: string) => {
    try {
      const processedImageBase64 = await CameraAPI.sendImageToBackend(uri);
      if (processedImageBase64) {
        setProcessedImage(`data:image/jpeg;base64,${processedImageBase64}`);
      }
    } catch (error) {
      Toast.show("❗ Error processing image", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.cameraContainer}>
        <AutoCameraComponent
          onImageCapture={handleImageCapture}
          isActive={isActive}
        />
        {processedImage && (
          <Image
            source={{ uri: processedImage }}
            style={styles.overlay}
            resizeMode="cover"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LiveDetectionScreen;
