import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../screens/SettingsScreen';
import { ThemeProvider } from '../context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';

describe('SettingsScreen', () => {
  it('renders settings screen correctly', () => {
    const { getByText } = render(
    <NavigationContainer>
        <ThemeProvider>
            <SettingsScreen />
        </ThemeProvider>
    </NavigationContainer>
    );

    // Check if setting options are rendered
    expect(getByText('Font Size')).toBeTruthy();
    expect(getByText('Dark Mode')).toBeTruthy();
  });

  it('toggles dark mode correctly', () => {
    const { getByText } = render(
        <NavigationContainer>
            <ThemeProvider>
                <SettingsScreen />
            </ThemeProvider>
        </NavigationContainer>
    );

    // Press the Dark Mode button
    fireEvent.press(getByText('Dark Mode'));

    // Verify that dark mode is enabled (You may need to mock the state and assert)
    expect(getByText('Light Mode')).toBeTruthy(); // Assuming Light Mode replaces Dark Mode when toggled
  });
});
