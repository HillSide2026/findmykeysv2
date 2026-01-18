// Importing StyleSheet from React Native to define component-specific styles
import { StyleSheet } from "react-native";

// Importing a custom colors module for consistent color usage
import colors from "./colors";

// Defining the styles for the application's components
const styles = StyleSheet.create({
  // Styles for the button
  button: {
    alignItems: "center", // Centers the button content horizontally
    backgroundColor: "white", // White background for a clean look
    borderRadius: 30, // Makes the button circular by setting half of its width/height as the radius
    elevation: 2, // Adds shadow effect for Android
    height: 60, // Fixed height for the button
    justifyContent: "center", // Centers the button content vertically
    shadowColor: "#000", // Shadow color (black) for iOS
    shadowOffset: { width: 0, height: 2 }, // Offset for the shadow on iOS
    shadowOpacity: 0.1, // Shadow transparency for iOS
    shadowRadius: 2, // Blur radius for the shadow on iOS
    width: 60, // Fixed width for the button
  },
  // Styles for the main container
  container: {
    alignItems: "flex-end", // Aligns the button to the right side of the screen
    flex: 1, // Makes the container take up the full available space
    justifyContent: "center", // Vertically centers the content within the container
  },
  // Styles for the transcribed text display
  transcribedText: {
    color: "black", // Black text color for visibility
    fontSize: 16, // Sets the font size for better readability
    marginTop: 20, // Adds space above the transcribed text
  },
});

// Exporting the styles object for use in other components
export default styles;
