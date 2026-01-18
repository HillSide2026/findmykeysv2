import { StyleSheet, Dimensions } from "react-native";
import colors from "./colors";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 0,
        backgroundColor: colors.lightBlue,
    },
    cameraContainer: {
        width: '100%',
        height: '75%',
        borderRadius: 0,
        overflow: 'hidden',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    capturedImage: {
        width: width * 0.85, 
        height: width * 0.85, 
        borderRadius: 0,
        borderWidth: 2,
        borderColor: "#ddd",
        marginBottom: 20,
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingText: {
        fontSize: 16,
        color: "#333",
        marginTop: 10,
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        width: '90%', 
        alignSelf: 'center',
    },
    modalButtonContainer: {
        flexDirection: "column",
        alignItems: 'stretch', 
        marginTop: 15,
        width: "100%",
        gap: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: '500',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.7,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    processedImage: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#00FF00",
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 15,
        width: '100%',
        paddingHorizontal: 20,
    },
    voiceButtonContainer: {
        width: '100%',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 20,
        gap: 10,
    },
    submitButton: {
        width: '100%', 
        alignItems: "center",
    },
});

export default styles;