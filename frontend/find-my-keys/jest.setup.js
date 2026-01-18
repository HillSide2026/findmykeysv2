// jest.setup.js

// Extend Jest with additional matchers from Testing Library
import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage for tests
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-image-picker', () => ({
    launchImageLibraryAsync: jest.fn(() => Promise.resolve({ cancelled: false, uri: 'test-image.jpg' })),
    launchCameraAsync: jest.fn(() => Promise.resolve({ cancelled: false, uri: 'test-camera.jpg' })),
  }));
  
  jest.mock('expo-camera', () => ({
    requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    getAvailableCameraTypesAsync: jest.fn(() => Promise.resolve([])),
    launchCameraAsync: jest.fn(() => Promise.resolve({ uri: 'test-uri' })),
  }));
  

// Mock any other native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
