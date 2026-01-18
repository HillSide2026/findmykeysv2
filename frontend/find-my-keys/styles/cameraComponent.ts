import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingIndicator: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  processingText: {
    color: 'white',
    fontSize: 16,
  },
  outerCircle: {
    marginBottom: 16,
    width: 70, // Outer circle diameter
    height: 70,
    borderRadius: 40, // Makes it a perfect circle
    backgroundColor: "white", // Outer circle color
    borderWidth: 2, // Border width for the outer ring
    borderColor: "black", // Border color
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 50, // Inner circle diameter
    height: 50,
    borderRadius: 30, // Makes it a perfect circle
    backgroundColor: "white", // Inner circle color
    borderWidth: 2, // Thin inner border
    borderColor: "black", // Inner border color
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  camera: {
    flex: 7,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 0,
  },
  button: {
    backgroundColor: "#2C4D76",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  uriContainer: {
    padding: 10,
  },
  uriText: {
    fontSize: 14,
    color: "black",
  },
});

export default styles;
