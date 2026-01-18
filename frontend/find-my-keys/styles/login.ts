// Importing StyleSheet and Dimensions from React Native
import { StyleSheet, Dimensions } from "react-native";


// Getting the width of the device window to create responsive styles
const windowWidth = Dimensions.get("window").width;

// Defining the styles object
const styles = StyleSheet.create({
  additionalOptionsButton: {
    width: "100%", // Full width
    alignItems: "center", // Centers the button content
    marginTop: windowWidth * 0.05, // Space above the button
    paddingVertical: windowWidth * 0.02, // Dynamic vertical padding
  },
  additionalOptionsText: {
    marginTop: "5%", // Space above the text
    fontFamily: "Courier New", // Custom font
    fontSize: windowWidth * 0.05,
    fontWeight: "400", // Regular font weight
    lineHeight: windowWidth * 0.05, // Line height for readability
    color: "#1e1e1e", // Dark gray text color
    textAlign: "center", // Centers the text
    textDecorationLine: "underline", // Underlines the text
    width: "100%", // Full width
  },
  container: {
    flex: 1, // Makes the container take up the full screen
    justifyContent: "center",
    alignContent: "center",
  },
  credentialsContainer: {
    gap: 8, // Adds space between child components
    width: "100%", // Full width of the parent
    marginBottom: 16, // Adds space below the container
  },
  formContainer: {
    width:  "45%", // Makes the form 85% of the screen width
    height: "60%",
    padding: 20, // Adds padding inside the form
    borderRadius: 10, // Rounded corners
    borderWidth: 1, // Adds a border around the form
    borderColor: "#8ECFF5", // Light blue border color
    alignItems: "center", // Centers form content horizontally
    justifyContent: "center", // Centers form content vertically
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow blur for iOS
    // top: -140, // Moves the form upward
    // left: 0, // Aligns the form to the left edge
    marginBottom: "5%",
  },
  input: {
    flex: 1, // Takes up available space in the container
    fontFamily: "Inter", // Custom font
    fontSize: 16, // Font size for the input
    fontWeight: "400", // Regular font weight
    color: "#b3b3b3", // Light gray text color
    paddingVertical: 8, // Vertical padding inside the input
  },
  inputContainer: {
    flexDirection: "row", // Arranges icon and input field in a row
    alignItems: "center", // Aligns items vertically in the center
    width: "100%", // Full width of the parent
    padding: 12, // Adds padding inside the container
    backgroundColor: "#ffffff", // White background for the input
    borderRadius: 8, // Rounded corners
    borderWidth: 1, // Adds a border
    borderColor: "#d9d9d9", // Light gray border color
  },
  labelHeader: {
    fontFamily: "Inter", // Custom font
    fontSize: windowWidth * 0.05, // Font size for labels
    fontWeight: "400", // Regular font weight
    lineHeight: 22, // Line height for better readability
    marginBottom: 4, // Space below the label
  },
  labelInput: {
    marginBottom: 8, // Space below the input field
    fontSize: 16, // Font size for input text
  },
  scrollContainer: {
    flex: 1, // Allows the content to grow
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  signInButton: {
    paddingVertical: 12, // Vertical padding for the button
    paddingHorizontal: 20, // Horizontal padding for the button
    borderRadius: 8, // Rounded corners
    width: "100%", // Full width
    alignItems: "center", // Centers the button content
    marginTop: 10, // Space above the button
  },
  signInButtonText: {
    color: "#ffffff", // White text color
    fontSize: 16, // Font size for the button text
    fontWeight: "600", // Semi-bold font weight
  },
  signUp: {
    marginTop: 20, // Space above the link
    color: "blue", // Blue text for sign-up link
    textAlign: "center", // Centers the text
    textDecorationLine: "underline", // Underlines the text
    width: "100%", // Full width
  },
  titleContainer: {
    flex: 1, // Allows the title to grow and take available space
    alignItems: "center", // Centers the title horizontally
    width: "100%", // Ensures the container spans the full width of the screen
    // marginBottom: 20, // Adds space below the title
  },
  titleText: {
    fontFamily: "", // Custom font
    fontSize: 48, // Large font size for the title
    fontWeight: "700", // Bold font weight
    letterSpacing: -0.96, // Adjusts spacing between letters
    textAlign: "center", // Centers the text
    marginTop: 20, // Adds space above the title
    marginBottom: 10, // Adds space below the title
  },
  underline: {
    marginTop: 10, // Space above the underline
    width: "80%", // 80% of the screen width
    height: 1, // Thin line
    backgroundColor: "#d9d9d9", // Light gray color
    alignSelf: "center", // Centers the line
  },
});

export default styles;
