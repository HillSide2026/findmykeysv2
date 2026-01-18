// Importing StyleSheet from React Native to create component-specific styles
import { StyleSheet } from "react-native";

// Importing a custom colors module to use predefined color values
import colors from "./colors";

// Defining the styles for the application components
const styles = StyleSheet.create({
  // Styles for the header of the "Objects" section
  objectsHeader: {
    backgroundColor: colors.lightBlue, // Light blue background color from the colors module
    borderBottomWidth: 0, // No bottom border for a cleaner look
    elevation: 0, // Removes shadow effect on Android
    height: 50, // Fixed height for the header
    shadowOpacity: 0, // Removes shadow effect on iOS
  },
  // Styles for the title text in the "Objects" header
  objectsHeaderTitle: {
    color: "#000", // Black color for the title text
    fontSize: 20, // Font size for the title text
    fontWeight: "600", // Semi-bold font weight for emphasis
  },
  // Styles for the header of the voice detection section
  voiceDetectionHeader: {
    backgroundColor: colors.lightBlue, // Light blue background color, consistent with the objects header
  },
});

// Exporting the styles object so it can be used in other parts of the application
export default styles;
