import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  Button,
  useColorScheme,
  Switch,
} from "react-native";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons"; // Icons package
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import styles from "../styles/settings";
import { logout } from "../services/auth";
import { getTheme, updateTheme } from "../services/settings";
import Toast from "react-native-root-toast";
import colors from "../styles/colors";


type SettingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Settings"
>;

const SettingsScreen: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null); // State to hold the user's name
  const [fontSizeModalVisible, setFontSizeModalVisible] = useState(false);
  const [dirSpecsModalVisible, setDirSpecsModalVisible] = useState(false);
  const [volume, setVolume] = useState(50);
  const navigation = useNavigation<SettingsNavigationProp>();

  const {
    isDarkMode,
    setIsDarkMode,
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
  } = useTheme();

  const darkColor = isDarkMode ? "#000 " : "#fff"; // Set background color based on dark mode
  const textColor = isDarkMode ? "#fff" : "#000"; // Set text color based on dark mode

  const fontColors = isDarkMode
    ? ["#FFFFFF", "#FF0000", "#0000FF", "#008000", "#FFA500"] // White instead of black in dark mode
    : ["#000000", "#FF0000", "#0000FF", "#008000", "#FFA500"]; // Default colors

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const response = await getTheme(); // Use getTheme to fetch the current theme
        setIsDarkMode(response.data.theme === "dark");
      } catch (error) {
        console.error("Failed to fetch user preferences:", error);
        Toast.show("❗ Failed to fetch user preferences.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      }
    };

    fetchUserPreferences();
  }, []);

  useEffect(() => {
    // Fetch the user's name from AsyncStorage when the component mounts
    const fetchUserName = async () => {
      const storedName = await AsyncStorage.getItem("user_name");
      if (storedName) {
        setUserName(storedName);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Use the new logout function
      await AsyncStorage.clear(); // Clear all AsyncStorage data (including user session)

      Toast.show("✅ Logged out.", { duration: Toast.durations.SHORT, position: Toast.positions.TOP });
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // Set the index to 0 (first screen)
          routes: [{ name: "Login" }], // Define the stack with only the Login screen
        })
      );
    } catch (error) {
      console.error("Logout failed:", error);
      Toast.show("❗ Failed to log out.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  const handleToggleDarkMode = async (value: boolean) => {
    setIsDarkMode(value); // Toggle between dark and light modes

    try {
      const colorMode = value ? "dark" : "light";
      await updateTheme(colorMode); // Use updateTheme to update the theme
      setIsDarkMode(value);
      Toast.show("✅ Theme updated.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } catch (error) {
      console.error("Failed to update color mode:", error);
      Toast.show("❗ Failed to update theme.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  type SettingItem = {
    id: string;
    title: string;
    action?: () => void;
    isSlider?: boolean;
    isToggle?: boolean;
    value?: boolean;
  };

  // List of settings options
  const settingsOptions = [
    {
      id: "1",
      title: "Font Size",
      action: () => setFontSizeModalVisible(true),
    },
    { id: "2", title: "Volume", isSlider: true },
    { id: "3", title: "Dark Mode", isToggle: true, value: isDarkMode },
    {
      id: "4",
      title: "Direction Specifications",
      action: () => setDirSpecsModalVisible(true),
    },
    { id: "5", title: "Log Out", action: handleLogout },
  ];

  // Render each setting item
  const renderSettingItem = ({ item }: { item: SettingItem }) => {
    if (item.isSlider) {
      return (
        <View style={styles.settingItem}>
          <Text
            style={[
              styles.settingText,
              { fontSize: fontSize, color: isDarkMode ? "#ffffff" : "#000000" },
            ]}
          >
            {item.title}
          </Text>
          <Slider
            style={{ width: 150 }}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={setVolume}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#1EB1FC"
          />
        </View>
      );
    }

    if (item.isToggle) {
      return (
        <View style={styles.settingItem}>
          <Text
            style={[
              styles.settingText,
              { fontSize: fontSize, color: isDarkMode ? "#ffffff" : "#000000" },
            ]}
          >
            {item.title}
          </Text>
          <Switch
            value={item.value}
            onValueChange={handleToggleDarkMode} // Toggle function for dark mode
          />
        </View>
      );
    }

    if (item.action) {
      return (
        <TouchableOpacity style={styles.settingItem} onPress={item.action}>
          <Text
            style={[
              styles.settingText,
              { fontSize: fontSize, color: isDarkMode ? "#ffffff" : "#000000" },
            ]}
          >
            {item.title}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDarkMode ? "#ffffff" : "#000000"}
          />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.darkBlue : colors.lightBlue },
      ]}
    >
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Ionicons
            name="person-circle-outline"
            size={60}
            color={isDarkMode ? "#ffffff" : "#000000"}
          />
        </View>
        <Text
          style={[
            styles.profileName,
            { color: isDarkMode ? "#ffffff" : "#000000" },
          ]}
        >
          {userName || "User"}
        </Text>
      </View>

      <FlatList
        data={settingsOptions}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.id}
        style={[
          styles.settingsList,
          { backgroundColor: isDarkMode ? colors.darkBlue : colors.lightBlue },
        ]}
      />

      <Modal
        visible={fontSizeModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Font Size</Text>
            {[14, 16, 18, 20, 24].map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => {
                  setFontSize(size);
                  setFontSizeModalVisible(false);
                }}
              >
                <Text style={[styles.modalOption, { fontSize: size }]}>
                  Font Size: {size}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              title="Close"
              onPress={() => setFontSizeModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <Modal
        visible={dirSpecsModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Select Directory Specification Level
            </Text>
            <TouchableOpacity
              onPress={() => {
                setDirSpecsModalVisible(false);
              }}
            ></TouchableOpacity>
            <Button
              title="Close"
              onPress={() => setDirSpecsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;
