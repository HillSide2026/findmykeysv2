import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CameraScreen from '../screens/CameraScreen';
import { Alert } from 'react-native';

// Mock the fetch API globally
globalThis.fetch = jest.fn();

// Mock implementation of fetch as a Jest function
const mockedFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>;

describe('CameraScreen', () => {
  beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {}); // Mock the Alert.alert function
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset all mocks after each test
  });

  it('renders the CameraScreen correctly', () => {
    const { getByText } = render(<CameraScreen />);

    // Check that the Capture Another Image button is rendered
    expect(getByText('Capture Another Image')).toBeTruthy();

    // Check that the Submit Image button is rendered
    expect(getByText('Submit Image')).toBeTruthy();
  });

  it('captures an image and shows success alert', async () => {
    // Render the CameraScreen component
    const { getByText } = render(<CameraScreen />);

    // Simulate image capture by pressing the mock button
    fireEvent.press(getByText('Mock Camera'));

    // Check if the alert is called after image capture
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Image Captured!', 'You have successfully captured an image.');
    });

    // Check if the Submit button is still enabled
    expect(getByText('Submit Image')).toBeTruthy();
  });

  it('sends the image to the backend successfully', async () => {
    // Mock a successful response from fetch
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ image: 'processed_image_path.png' }),
    } as Response);

    const { getByText } = render(<CameraScreen />);

    // Simulate image capture
    fireEvent.press(getByText('Mock Camera'));

    // Simulate pressing the Submit Image button
    fireEvent.press(getByText('Submit Image'));

    // Assert that fetch was called with correct parameters
    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith('http://127.0.0.1:5000/detect', expect.objectContaining({
        method: 'post',
        body: expect.any(FormData),
      }));
    });

    // Check if success alert is shown after the image is processed
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Image processed successfully!');
    });
  });

  it('shows an error if no image is captured before submission', async () => {
    const { getByText } = render(<CameraScreen />);

    // Simulate pressing the Submit button without capturing an image
    fireEvent.press(getByText('Submit Image'));

    // Assert that the alert is shown with the correct message
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('No image', 'Please capture an image first.');
    });
  });

  it('handles backend error when sending image', async () => {
    // Mock a rejected response from fetch
    mockedFetch.mockRejectedValueOnce(new Error('Failed to upload image'));

    const { getByText } = render(<CameraScreen />);

    // Simulate image capture
    fireEvent.press(getByText('Mock Camera'));

    // Simulate pressing the Submit Image button
    fireEvent.press(getByText('Submit Image'));

    // Wait for the fetch call to fail
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to process the image. Please try again.');
    });
  });
});
