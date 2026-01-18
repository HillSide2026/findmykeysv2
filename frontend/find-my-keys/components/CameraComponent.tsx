import React, { useState, useRef } from "react";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { Button, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/cameraComponent";

interface CameraComponentProps {
  /**
   * Callback function to handle the captured image URI.
   * @param uri - The URI of the captured image.
   */
  onImageCapture: (uri: string) => void;
}

/**
 * CameraComponent is a React functional component that provides a camera interface
 * for capturing images. It handles camera permissions and displays the camera view.
 *
 * @param {CameraComponentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const CameraComponent: React.FC<CameraComponentProps> = ({
  onImageCapture,
}) => {
  const cameraRef = useRef<typeof CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [type, setType] = useState<CameraType>("back");

  if (!permission) {
    // Camera permissions are still loading.
    return <Text>Requesting permissions...</Text>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text>
          Permission for camera not granted. Please change this in settings.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  /**
   * takePic is an asynchronous function that captures a picture using the camera.
   * It retrieves the image URI and calls the onImageCapture callback with the URI.
   */
  const takePic = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };

      const newPhoto = await cameraRef.current.takePictureAsync(options);
      onImageCapture(newPhoto.uri);
      setPhoto(newPhoto);
    }
  };

  return (
    <>
      <CameraView style={styles.camera} ref={cameraRef} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePic} style={styles.outerCircle}>
            <View style={styles.innerCircle}></View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </>
  );
};

export default CameraComponent;
