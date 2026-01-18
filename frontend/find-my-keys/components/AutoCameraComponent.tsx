import React, { useState, useRef, useEffect } from "react";
import {
  CameraView,
  Camera,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { Text, View } from "react-native";
import styles from "../styles/cameraComponent";

interface AutoCameraComponentProps {
  onImageCapture: (uri: string) => void;
  isActive?: boolean;
}

const AutoCameraComponent: React.FC<AutoCameraComponentProps> = ({
  onImageCapture,
  isActive = true,
}) => {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [type, setType] = useState<CameraType>("back");

  useEffect(() => {
    if (isActive && permission?.granted) {
      startAutoCapture();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, permission?.granted]);

  if (!permission) {
    return <Text>Requesting permissions...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>
          Permission for camera not granted. Please change this in settings.
        </Text>
      </View>
    );
  }

  const startAutoCapture = () => {
    intervalRef.current = setInterval(async () => {
      if (!isProcessing && cameraRef.current) {
        try {
          setIsProcessing(true);
          const options = {
            quality: 0.5,
            base64: true,
            exif: false,
          };

          const photo = await cameraRef.current.takePictureAsync(options);
          onImageCapture(photo.uri);
        } catch (error) {
          console.error("Error taking picture:", error);
        } finally {
          setIsProcessing(false);
        }
      }
    }, 1000);
  };

  return (
    <CameraView style={styles.camera} ref={cameraRef} type={type}>
      <View style={styles.overlay}>
        {isProcessing && (
          <View style={styles.processingIndicator}>
            <Text style={styles.processingText}>Processing...</Text>
          </View>
        )}
      </View>
    </CameraView>
  );
};

export default AutoCameraComponent;
