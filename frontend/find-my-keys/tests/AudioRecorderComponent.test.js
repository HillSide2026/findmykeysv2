import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AudioRecorder from "../components/AudioRecorder"; // Adjust the path as necessary
import { Audio } from "expo-av";

jest.mock("expo-av", () => ({
  Audio: {
    requestPermissionsAsync: jest.fn(),
    setAudioModeAsync: jest.fn(),
    Recording: {
      createAsync: jest.fn(),
      RECORDING_OPTIONS_PRESET_HIGH_QUALITY: {},
    },
  },
}));

describe("AudioRecorder", () => {
  const onRecordingSavedMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render correctly and show the start recording button", () => {
    const { getByText } = render(
      <AudioRecorder onRecordingSaved={onRecordingSavedMock} />
    );

    expect(getByText("Start Recording")).toBeTruthy();
  });

  test("should request permissions and start recording when button is pressed", async () => {
    // Mock the permission request
    Audio.requestPermissionsAsync.mockResolvedValueOnce({ granted: true });
    // Mock the recording creation
    const mockRecording = {
      stopAndUnloadAsync: jest.fn(),
      getURI: jest.fn().mockReturnValue("test-audio-uri"),
    };
    Audio.Recording.createAsync.mockResolvedValueOnce({
      recording: mockRecording,
    });

    const { getByText } = render(
      <AudioRecorder onRecordingSaved={onRecordingSavedMock} />
    );

    // Start recording
    fireEvent.press(getByText("Start Recording"));

    await waitFor(() => {
      expect(Audio.requestPermissionsAsync).toHaveBeenCalled();
      expect(Audio.setAudioModeAsync).toHaveBeenCalledWith({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      expect(getByText("Stop Recording")).toBeTruthy(); // Check if button text changes
    });
  });

  test("should stop recording and call onRecordingSaved when button is pressed", async () => {
    // Mock the permission request
    Audio.requestPermissionsAsync.mockResolvedValueOnce({ granted: true });
    // Mock the recording creation
    const mockRecording = {
      stopAndUnloadAsync: jest.fn(),
      getURI: jest.fn().mockReturnValue("test-audio-uri"),
    };
    Audio.Recording.createAsync.mockResolvedValueOnce({
      recording: mockRecording,
    });

    const { getByText } = render(
      <AudioRecorder onRecordingSaved={onRecordingSavedMock} />
    );

    fireEvent.press(getByText("Start Recording"));

    await waitFor(() => {
      expect(getByText("Stop Recording")).toBeTruthy();
    });

    // Stop recording
    fireEvent.press(getByText("Stop Recording"));

    await waitFor(() => {
      expect(mockRecording.stopAndUnloadAsync).toHaveBeenCalled();
      expect(onRecordingSavedMock).toHaveBeenCalledWith("test-audio-uri");
    });
  });
});
