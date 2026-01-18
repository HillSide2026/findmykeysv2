import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import HomeScreen from "../screens/HomeScreen";
import { sendDataToBackend } from "../services/api";
import * as Speech from "expo-speech";

jest.mock("../services/api");
jest.mock("expo-speech");

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  test("should render CameraComponent and AudioRecorder", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Submit")).toBeTruthy();
  });

  test("should alert when submitting without audio or image", async () => {
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText("Submit"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Please record audio and capture an image first."
      );
    });
  });
});
