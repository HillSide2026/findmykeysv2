import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  settingsList: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 10,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: {
    // fontSize: 16,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#333",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  navButton: {
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
  },
});


export default styles;