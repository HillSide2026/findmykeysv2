// Importing StyleSheet from React Native to define the styles for the components
import { StyleSheet } from "react-native";

// Defining the styles object for the application
const styles = StyleSheet.create({
    // Styles for buttons
    button: {
        backgroundColor: "#007BFF", // Blue background color for the button
        borderRadius: 5, // Rounded corners for the button
        flex: 1, // Allows buttons to grow and fill available space equally
        margin: 5, // Adds overall margin around the button
        marginHorizontal: 10, // Adds horizontal margin between buttons
        paddingHorizontal: 20, // Horizontal padding for the button
        paddingVertical: 10, // Vertical padding for the button
    },
    // Styles for disabled buttons
    buttonDisabled: {
        backgroundColor: '#ccc', // Light gray background for the disabled button
        opacity: 0.7, // Makes the disabled button slightly transparent
    },
    // Styles for the button text
    buttonText: {
        color: "#fff", // White text color
        fontSize: 16, // Font size for the button text
        textAlign: "center", // Centers the text within the button
    },
    // Styles for the camera container
    cameraContainer: {
        alignItems: 'center', // Centers the camera content horizontally
        backgroundColor: '#000', // Black background for the camera view
        borderRadius: 10, // Rounded corners for the container
        height: '70%', // Sets the container height to 70% of the parent
        justifyContent: 'center', // Centers the camera content vertically
        overflow: 'hidden', // Ensures content does not exceed the container's boundaries
        width: '70%', // Sets the container width to 70% of the parent
    },
    // Styles for the captured image
    capturedImage: {
        borderColor: "#ddd", // Light gray border color
        borderRadius: 10, // Rounded corners for the image
        borderWidth: 2, // Border width around the image
        height: 400, // Fixed height for the image
        marginBottom: 20, // Adds space below the image
        width: 350, // Fixed width for the image
    },
    // Styles for the modal button container
    modalButtonContainer: {
        flexDirection: "row", // Arranges buttons in a row
        justifyContent: "space-between", // Distributes buttons evenly across the container
        marginTop: 20, // Adds space above the button container
        width: "100%", // Full width for the button container
    },
    // Styles for the modal content
    modalContent: {
        alignItems: "center", // Centers the modal content horizontally
        backgroundColor: "white", // White background for the modal
        borderRadius: 10, // Rounded corners for the modal
        justifyContent: "center", // Centers the modal content vertically
        padding: 20, // Adds padding inside the modal
    },
    // Styles for the scroll view content
    scrollViewContent: {
        alignItems: "center", // Centers the content horizontally
        backgroundColor: "#F0E5E5", // Light background color for the scroll view
        flexGrow: 1, // Allows the content to grow within the scroll view
        justifyContent: "flex-start", // Aligns content to the top of the container
        paddingVertical: 20, // Adds vertical padding for better spacing
    },
});

// Exporting the styles object for use in other components
export default styles;
