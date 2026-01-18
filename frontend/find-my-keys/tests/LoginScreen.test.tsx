import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

// Mock the Axios request
jest.mock('axios');

// Type cast axios.post as a Jest mock function
const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;

describe('LoginScreen', () => {
  it('renders the login screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    // Check if username input is rendered
    expect(getByPlaceholderText('Enter username or email')).toBeTruthy();

    // Check if the sign in button is rendered
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('allows login with valid credentials', async () => {
    // Mock successful login response
    mockedAxiosPost.mockResolvedValueOnce({
      data: { token: 'fake-token' },
    });

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    // Enter email and password
    fireEvent.changeText(getByPlaceholderText('Enter username or email'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('**********'), 'password123');

    // Press the Sign In button
    fireEvent.press(getByText('Sign In'));

    // Assert that the API call was made with the correct parameters
    await waitFor(() => {
      expect(mockedAxiosPost).toHaveBeenCalledWith(
        'https://findmykeys3.hadinaqvi.dev/login',
        {
          email: 'testuser',
          password: 'password123',
        }
      );
    });

    // You can add an additional expectation if you check for navigation
    // expect(mockedNavigation.replace).toHaveBeenCalledWith('HomeScreen');
  });

  it('handles login failure', async () => {
    // Mock failed login response
    mockedAxiosPost.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: 'Invalid email or password!' },
      },
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    // Enter email and password
    fireEvent.changeText(getByPlaceholderText('Enter username or email'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('**********'), 'wrongpassword');

    // Press the Sign In button
    fireEvent.press(getByText('Sign In'));

    // Wait for the API call to finish
    await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.objectContaining({
            response: {
              status: 401,
              data: { message: 'Invalid email or password!' }
            }
        }));
    });
  
      // Restore the original console.error implementation
      consoleErrorSpy.mockRestore();
  });
});
