import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CameraComponent from "../components/CameraComponent";
import { CameraView, useCameraPermissions } from "expo-camera";

jest.mock("expo-camera", () => ({
  CameraView: jest.fn(),
  useCameraPermissions: jest.fn(),
}));

describe("CameraComponent", () => {
  const onImageCaptureMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display "Requesting permissions..." when camera permission is loading', () => {
    useCameraPermissions.mockReturnValue([null, jest.fn()]); // No permissions yet

    const { getByText } = render(
      <CameraComponent onImageCapture={onImageCaptureMock} />
    );

    expect(getByText("Requesting permissions...")).toBeTruthy();
  });

  test("should display the permission request button when camera permission is denied", () => {
    const requestPermissionMock = jest.fn();
    useCameraPermissions.mockReturnValue([
      { granted: false },
      requestPermissionMock,
    ]);

    const { getByText, getByRole } = render(
      <CameraComponent onImageCapture={onImageCaptureMock} />
    );

    expect(
      getByText(
        "Permission for camera not granted. Please change this in settings."
      )
    ).toBeTruthy();
    expect(getByRole("button", { name: /grant permission/i })).toBeTruthy();
  });

  test('should call requestPermission when "grant permission" button is clicked', () => {
    const requestPermissionMock = jest.fn();
    useCameraPermissions.mockReturnValue([
      { granted: false },
      requestPermissionMock,
    ]);

    const { getByRole } = render(
      <CameraComponent onImageCapture={onImageCaptureMock} />
    );

    const grantPermissionButton = getByRole("button", {
      name: /grant permission/i,
    });
    fireEvent.press(grantPermissionButton);

    expect(requestPermissionMock).toHaveBeenCalled();
  });
});
