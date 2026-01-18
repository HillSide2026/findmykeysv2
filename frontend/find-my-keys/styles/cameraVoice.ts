import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  // scrollViewContent: {
  //   flexGrow: 1,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   paddingVertical: 20,
  //   backgroundColor: "#F0E5E5",
  // },
  cameraContainer: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 20,
  },
  capturedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  processedImage: {
    // New style for processed image
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#00FF00", // Different border color for distinction
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 1, // Added to make buttons occupy equal space
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10, // Add margin for spacing
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.7,
  },
});

export default styles;
