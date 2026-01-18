import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignupScreen";
import ObjectsScreen from "./screens/ObjectScreen";
import SettingsScreen from "./screens/SettingsScreen";
import VoiceCommandScreen from "./screens/VoiceCommandScreen";
import { AuthProvider } from "./context/AuthContext";
import VoiceDetectionScreen from "./screens/VoiceDetectionScreen";
import { ThemeProvider } from "./context/ThemeContext";
import styles from "./styles/appStyle";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";

/**
 * Type definition for the root stack navigator's parameter list.
 * Each screen in the navigator can have its own parameters.
 */
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Objects: undefined;
  Settings: undefined;
  Voice: undefined;
  Detect: undefined;
  VoiceDetection: undefined;
  OldDetection: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

/**
 * Main application component that sets up the navigation and theme context.
 *
 * @returns {JSX.Element} The rendered application component.
 */
const App = () => {
  return (
    <RootSiblingParent>
      <ThemeProvider>
        <NavigationContainer>
          <AuthProvider>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  title: "",
                }}
              />
              <Stack.Screen
                name="Signup"
                component={SignUpScreen}
                options={{
                  headerShown: true, // Hides the header completely
                }}
              />
              <Stack.Screen
                name="Objects"
                component={ObjectsScreen}
                options={{
                  headerStyle: styles.objectsHeader, // Apply the style from StyleSheet
                  headerTitleStyle: styles.objectsHeaderTitle,
                  title: "",
                }}
              />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen
                name="Voice"
                component={VoiceCommandScreen}
                options={{
                  title: "",
                }}
              />
              <Stack.Screen
                name="VoiceDetection"
                component={VoiceDetectionScreen}
                options={{
                  headerStyle: styles.voiceDetectionHeader,
                  title: "",
                }}
              />
              <Stack.Screen
                name="OldDetection"
                component={VoiceCommandScreen}
                options={{
                  headerStyle: styles.voiceDetectionHeader,
                  title: "",
                }}
              />
            </Stack.Navigator>
          </AuthProvider>
        </NavigationContainer>
      </ThemeProvider>
    </RootSiblingParent>
  );
};

export default App;
