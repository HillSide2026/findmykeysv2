import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  addedItemIcon: {
    width: 25,
    height: 25,
    marginRight: 16,
    marginBottom: 8,
    backgroundColor: "#ccc",
    borderRadius: 20,
    justifyContent: "center", // Centers the icon vertically
    alignItems: "center", // Centers the icon horizontally
  },
  container: {
    flex: 1,
    // backgroundColor: "#f2f2f2",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  button: {
    width: 70,
    height: 70,
    flexDirection: 'column',
    // flex: 1,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff",
    padding: 4,
    borderRadius: 35,
    marginLeft: 25,
    marginVertical: 20, // Adds space between the buttons
    shadowColor: "#000",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  header: {
    //backgroundColor: '#d9b3ff',  // Light purple color for the header
    alignItems: "flex-start",
    padding: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10, // Space between input box and icons
  },
  addItemText: {
    marginRight: 8,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    borderColor: "#fffff",
    borderWidth: 1,
    marginVertical: 24,
    marginHorizontal: 24,
  },
  list: {
    flex: 1,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  listHeaderText: {
    fontWeight: "bold",
    fontSize: 14,
    // color: "#333",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
    backgroundColor: "#ccc",
    borderRadius: 20,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    maxWidth: 130,
  },
  itemActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "#2C4D76",
    padding: 20,
  },
  footerButton: {
    alignItems: "center",
  },
  footerButtonText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2aa5d5", // Transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 0,
    elevation: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#6200ee",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
  },
  inputRow: {
    width: "100%",
    flexDirection: "row", // Align the text box and icons in a row
    // alignItems: "center", // Align everything vertically
    marginBottom: 15, // Add some spacing below
  },
  radioGroup: {
    marginLeft: 10,
    flexDirection: "row", // Display icons horizontally
    alignItems: "center",
  },
  radioButton: {
    marginHorizontal: 5,
  },
  iconContainer: {
    width: 30, // Circular container
    height: 30, // Circular container
    borderRadius: 20, // Makes the container circular
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 10, // Small text for category names
    textAlign: "center",
  },
  iconContainerSelected: {
    backgroundColor: "transparent", // Prevent overlay, already handled in radioButton
  },
  selectTypeLabel: {
    marginBottom: -25, // Add space between the label and the input row
    fontSize: 14, // Font size for the label
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 125,
    marginLeft: 10,
  },
});

export default styles;
