import React from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import styles from "../styles/audioRecorder";

interface TranscriberProps {
  transcriptionSave: (uri: string) => void;
}

const Transcriber: React.FC<TranscriberProps> = ({ transcriptionSave }) => {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0]?.transcript);
    transcriptionSave(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: false,
      maxAlternatives: 1,
      continuous: true,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
      contextualStrings: [],
    });
  };

  return (
    <View style={styles.container}>
      {!recognizing ? (
        <Button title="Start" onPress={handleStart} />
      ) : (
        <Button
          title="Stop"
          onPress={() => {
            ExpoSpeechRecognitionModule.stop();
            console.log("Transcript:", transcript);
          }}
        />
      )}
    </View>
  );
};

export default Transcriber;
