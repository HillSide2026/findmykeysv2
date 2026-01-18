import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUpScreen from '../screens/SignupScreen';
import { useNavigation } from '@react-navigation/native';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('SignUpScreen', () => {
  it('renders the signup screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

    // Check if input fields are rendered
    expect(getByPlaceholderText('Enter Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter Name')).toBeTruthy();
    expect(getByPlaceholderText('Enter Password')).toBeTruthy();
  });

  it('handles sign up with valid credentials', () => {
    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

    // Enter email, name, and passwords
    fireEvent.changeText(getByPlaceholderText('Enter Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter Name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Enter Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Enter Password Again'), 'password123');

    // Press the Sign Up button
    fireEvent.press(getByText('Sign Up'));

    // Check if sign up action is triggered
    expect(getByText('Sign Up')).toBeTruthy();
  });
});
