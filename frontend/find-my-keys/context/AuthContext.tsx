import React, { createContext, useContext, useEffect, useState } from "react";
import { refresh } from "../services/auth"; // Adjust the import path as necessary
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

// Type definition for the root stack navigator's parameter list
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

interface AuthContextType {
  accessToken: string | null;
  refreshAccessToken: () => Promise<void>;
}

// Define the type for the navigation prop
type AuthNavigationProp = NavigationProp<RootStackParamList>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigation = useNavigation<AuthNavigationProp>(); // Use the typed navigation hook

  const refreshAccessToken = async () => {
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    if (!refreshToken) {
      return;
    }

    try {
      const response = await refresh();
      const newAccessToken = response.data.access_token;
      setAccessToken(newAccessToken);
      // Optionally store the new access token
      await AsyncStorage.setItem("access_token", newAccessToken);
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      // Navigate to the login screen if refreshing fails
      navigation.navigate("Login");
      Toast.show("❗ Session expired. Please log in again.", {
        duration: Toast.durations.SHORT,
      });
    }
  };

  useEffect(() => {
    // Refresh token every minute
    const intervalId = setInterval(() => {
      refreshAccessToken();
    }, 60000);
    refreshAccessToken();

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
