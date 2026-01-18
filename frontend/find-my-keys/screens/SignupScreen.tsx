import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "../styles/login"; // just reuse login styles for alignment consistency
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useTheme } from "../context/ThemeContext";
import { register } from "../services/auth";
import Toast from "react-native-root-toast";

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;

/**
 * SignUpScreen component for user registration.
 *
 * This component allows users to input their email, username, and password
 * to create a new account. It handles form validation and communicates with
 * the backend service to register the user.
 */
const SignUpScreen: React.FC = () => {
  // State variables to store user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigation = useNavigation<SignupScreenNavigationProp>();
  const {
    isDarkMode,
    setIsDarkMode,
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
  } = useTheme();

  /**
   * Handles the sign-up process.
   *
   * Validates user input, checks if passwords match, and attempts to register
   * the user via the register service. Displays alerts for success or failure.
   */
  const handleSignUp = async () => {
    // Validate that all required fields are filled in
    if (!email || !username || !password || !confirmedPassword) {
      Toast.show("❗ Please fill in all fields.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      return;
    }

    // Validate the the both passwords match
    if (password !== confirmedPassword) {
      Toast.show("❗ Passwords do not match. Please re-enter your password.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      return;
    }

    const toastId = Toast.show("🔄 Signing up...", {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
    });

    try {
      const response = await register(email, username, password);
      Toast.hide(toastId);
      if (response.status === 201) {
        Toast.show("✅ " + response.data.message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
        handleLogIn();
      }
    } catch (error) {
      Toast.hide(toastId);
      Toast.show("❗ A user with this email already exists.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  /**
   * Navigates to the login screen.
   *
   * This function is called when the user wants to log in instead of signing up.
   */
  const handleLogIn = () => {
    navigation.replace("Login");
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
              { color: isDarkMode ? "#000000" : "#FFFFFF" },
            ]}
          >
            Sign Up To Get Started
          </Text>
          <View style={styles.underline} />
        </View>

        {/* Form Section */}
        <View
          style={[
            styles.formContainer,
            {
              backgroundColor: isDarkMode ? "#424548" : "#FFFFFF",
              height: "75%",
            },
          ]}
        >
          {/* Email Input */}
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
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Name Input */}
          <View style={styles.credentialsContainer}>
            <Text
              style={[
                styles.labelHeader,
                { color: isDarkMode ? "#FFFFFF" : "#1e1e1e" },
              ]}
            >
              Name
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter Name"
              />
            </View>
          </View>

          {/* Password Input */}
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
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                secureTextEntry
              />
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.credentialsContainer}>
            <Text
              style={[
                styles.labelHeader,
                { color: isDarkMode ? "#FFFFFF" : "#1e1e1e" },
              ]}
            >
              Confirm Password
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
                placeholder="Re-enter Password"
                secureTextEntry
              />
            </View>
          </View>

          {/* Sign Up Button, Reuse sign-in button styling */}
          <TouchableOpacity
            style={[
              styles.signInButton,
              { backgroundColor: isDarkMode ? "#8ECFF5" : "#2C4D76" },
            ]}
            onPress={handleSignUp}
          >
            <Text style={styles.signInButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity
            style={[
              styles.additionalOptionsButton,
              {
                backgroundColor: isDarkMode ? "#424548" : "#FFFFFF",
                marginTop: "3%",
              },
            ]}
            onPress={handleLogIn}
          >
            <Text style={styles.additionalOptionsText}>
              Already have an account? Log in.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
