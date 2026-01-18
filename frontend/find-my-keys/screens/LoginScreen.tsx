import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import styles from "../styles/login";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useTheme } from "../context/ThemeContext";
import { login } from "../services/auth";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

/**
 * LoginScreen component for user authentication.
 *
 * This component allows users to input their email and password
 * to log into their account. It handles form validation and communicates with
 * the backend service to authenticate the user.
 */
const LoginScreen: React.FC = () => {
  // State variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {
    isDarkMode,
    setIsDarkMode,
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
  } = useTheme();

  /**
   * Handles the login process.
   *
   * Validates user input and attempts to log in the user via the login service.
   * Displays alerts for success or failure.
   */
  const handleLogin = async () => {
    // Validate that all required fields are filled in
    if (!email || !password) {
      Toast.show("❗ Please fill in all fields.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      return;
    }

    const toastid = Toast.show("🔄 Logging in...", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
    try {
      const response = await login(email, password);
      console.log(response);
      Toast.hide(toastid);

      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;

        // Store the JWT token in AsyncStorage for future requests
        await AsyncStorage.setItem("access_token", access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);

        // Navigate to the Objects screen upon successful login
        Toast.show("✅ Logged in.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
        navigation.replace("Objects");
      } else {
        Toast.show("❗ Email or password incorrect.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      }
    } catch (error) {
      Toast.hide(toastid);
      if ((error as AxiosError).response?.status === 401) {
        Toast.show("❗ Email or password incorrect.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      } else {
        Toast.show("❗ An unexpected error occurred.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  /**
   * Navigates to the sign-up screen.
   *
   * This function is called when the user wants to create a new account.
   */
  const handleSignUp = () => {
    navigation.replace("Signup");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#152332" : "#FFFFFF" },
      ]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { backgroundColor: isDarkMode ? "#152332" : "#FFFFFF" },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.titleText,
              { color: isDarkMode ? "#FFFFFF" : "#000000" },
            ]}
          >
            Find My Keys
          </Text>
          <View style={styles.underline} />
        </View>
        <View
          style={[
            styles.formContainer,
            { backgroundColor: isDarkMode ? "#424548" : "#FFFFFF" },
          ]}
        >
          <View style={styles.credentialsContainer}>
            <Text
              style={[
                styles.labelHeader,
                { color: isDarkMode ? "#FFFFFF" : "#1e1e1e" },
              ]}
            >
              Email
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter email here"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.credentialsContainer}>
            <Text
              style={[
                styles.labelHeader,
                { color: isDarkMode ? "#FFFFFF" : "#1e1e1e" },
              ]}
            >
              Password
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="**********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.signInButton,
              { backgroundColor: isDarkMode ? "#8ECFF5" : "#2C4D76" },
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
              style={styles.additionalOptionsButton}
              onPress={() => console.log("Forgot Password pressed")}
            >
              <Text style={styles.additionalOptionsText}>Forgot Password?</Text>
            </TouchableOpacity> */}

          <TouchableOpacity
            style={[
              styles.additionalOptionsButton,
              { backgroundColor: isDarkMode ? "#424548" : "#FFFFFF" },
            ]}
            onPress={handleSignUp}
          >
            <Text style={styles.additionalOptionsText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
