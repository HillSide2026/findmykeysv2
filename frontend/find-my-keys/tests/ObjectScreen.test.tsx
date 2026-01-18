import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ObjectsScreen from '../screens/ObjectScreen';
import { ThemeProvider } from '../context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';

// Mocking expo-camera
jest.mock('expo-camera', () => ({
    Camera: {
      requestCameraPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
    },
  }));

describe('ObjectsScreen', () => {
  it('renders the objects screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <NavigationContainer>
          <ObjectsScreen />
        </NavigationContainer>
      </ThemeProvider>
    );

    // Check if item input field is rendered
    expect(getByPlaceholderText('enter item name')).toBeTruthy();

    // Check if the Add Item button is rendered
    expect(getByText('Add Item')).toBeTruthy();
  });

  it('allows adding a new item', () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider>
        <NavigationContainer>
          <ObjectsScreen />
        </NavigationContainer>
      </ThemeProvider>
    );

    // Enter an item name
    fireEvent.changeText(getByPlaceholderText('enter item name'), 'New Item');

    // Press the Add Item button
    fireEvent.press(getByText('Add Item'));

    // Verify that the item is added (You may need to modify based on your rendering logic)
    expect(getByText('New Item')).toBeTruthy();
  });
});
