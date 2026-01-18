import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import CameraComponent from "../components/CameraComponent";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/objects";
import colors from "../styles/colors";
import {
  createObject,
  getObjects,
  updateObject,
  uploadObjectImage,
  deleteObject,
} from "../services/objects";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-root-toast";

type ObjectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Objects"
>;

type Item = {
  id: number;
  name: string;
  type: string;
  image: string[] | null;
};

const presetData: Item[] = [
  { id: 1, name: "Phone", type: "Phone", image: null },
  { id: 2, name: "Wallet", type: "Wallet", image: null },
  { id: 3, name: "Keys", type: "Keys", image: null },
  { id: 4, name: "Bottle", type: "Bottle", image: null },
  { id: 5, name: "Watch", type: "Watch", image: null },
  { id: 6, name: "Glasses", type: "Glasses", image: null },
];

const ObjectsScreen: React.FC = () => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const [userData, setuserData] = useState<Item[]>([]); // State to hold the items
  const [itemName, setItemName] = useState(""); // State for the item name
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for the selected image
  const [hasPermission, setHasPermission] = useState<boolean | null>(null); // State for camera permission
  const [isCameraVisible, setIsCameraVisible] = useState(false); // Show/hide camera
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // Captured image
  const [isEditVisible, setIsEditVisible] = useState(false); // Modal visibility for editing
  const [editItem, setEditItem] = useState<Item | null>(null); // The item being edited
  const [capturedItemId, setCapturedItemId] = useState<number | null>(null);
  const navigation = useNavigation<ObjectScreenNavigationProp>();
  const {
    isDarkMode,
    setIsDarkMode,
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
  } = useTheme();

  const backgroundColor = isDarkMode ? "#333" : "#fff";

  const fetchItems = async () => {
    try {
      const response = await getObjects();
      setuserData(response.data);
    } catch (error) {
      Toast.show("❗ Failed to fetch items.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  // Fetch the items from the backend on component mount
  useEffect(() => {
    if (shouldFetch) {
      fetchItems();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  // Request camera permission on component mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Handle permission error
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const uploadImageToObject = async (itemId: number, imageUri: string) => {
    try {
      const imageBlob = await getImageBlob(imageUri); // Convert URI to Blob
      const imageFile = new File([imageBlob], "image.jpg", {
        type: "image/jpeg",
      }); // Convert Blob to File by providing a filename and type
      const response = await uploadObjectImage(itemId.toString(), imageFile); // Call the abstracted function

      const newImageUrl = response.data.file_url;

      // Update the item with the new image URL added to the images array
      setuserData((prevData) =>
        prevData.map((item) =>
          item.id === itemId
            ? { ...item, image: [...(item.image || []), newImageUrl] }
            : item
        )
      );

      Toast.show("✅ Uploaded Image.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } catch (error) {
      Toast.show("❗ Failed to upload image.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  // Function to pick an image using Expo ImagePicker
  const handlePickImage = async (itemId: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      await uploadImageToObject(itemId, selectedImageUri);
    }
  };

  const handleImageCapture = async (imageUri: string) => {
    setIsCameraVisible(false); // Close the camera view

    if (capturedItemId !== null) {
      await uploadImageToObject(capturedItemId, imageUri); // Upload image for the specific item
      setCapturedItemId(null); // Clear the captured item ID
    }
  };

  // Function to handle image options (choose library or take picture)
  const handleImageOption = (itemId: number) => {
    Alert.alert(
      "Select An Image:",
      "",
      [
        // { text: "Take Picture", onPress: () => openCamera(itemId) },
        { text: "Choose from Library", onPress: () => handlePickImage(itemId) },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  // Convert URI to Blob
  const getImageBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob(); // Convert to Blob
    return blob;
  };

  // Function to add an item to the list
  const handleAddItem = async () => {
    if (itemName.trim() === "" || !selectedType) {
      Toast.show("❗ Please enter an item name and select a category.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      return;
    }

    const toastId = Toast.show("🔄 Adding item...", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
    try {
      const response = await createObject(selectedType, itemName);
      Toast.hide(toastId);

      Toast.show("✅ " + response.data.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      setShouldFetch(true);

      // Reset input fields
      setItemName("");
      setSelectedType(null);
      setSelectedImage(null);
    } catch (error) {
      Toast.hide(toastId);
      Toast.show("❗ Failed to add item.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  // Function to delete an item from the list and backend
  const handleDeleteItem = async (id: number) => {
    const toastId = Toast.show("🔄 Deleting item...", {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
    });
    try {
      const response = await deleteObject(id);

      // If successful, update the local state by removing the item from userData
      setuserData(userData.filter((item) => item.id !== id));

      Toast.hide(toastId);
      Toast.show("✅ " + response.data.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      setShouldFetch(true);
    } catch (error) {
      Toast.hide(toastId);
      Toast.show("❗ Failed to delete item.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  // Function to handle item edit (opens the modal)
  const handleEditItem = (item: Item) => {
    setEditItem(item); // Set the item to be edited
    setItemName(item.name); // Set the item name
    setIsEditVisible(true); // Show the edit modal
  };

  // Function to edit an item and update it in the backend
  const handleSaveEdit = async () => {
    if (editItem && selectedType) {
      const toastId = Toast.show("🔄 Updating item...", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
      try {
        const response = await updateObject(
          editItem.id.toString(),
          selectedType,
          itemName
        ); // Pass the ID and new name
        setuserData(
          userData.map((item) =>
            item.id === editItem.id ? { ...item, name: itemName } : item
          )
        );

        setIsEditVisible(false); // Close the modal
        setEditItem(null);
        setItemName(""); // Clear input fields
        Toast.hide(toastId);
        Toast.show("✅ " + response.data.message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
        setShouldFetch(true);
      } catch (error) {
        Toast.hide(toastId);
        Toast.show("❗ Failed to update item.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      }
    } else {
      Toast.show("❗ Please select a type and enter a name.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  const handleGoSettings = async () => {
    navigation.navigate("Settings");
  };

  const handleGoCamera = () => {
    navigation.navigate("VoiceDetection");
  };

  const handleGoOldDetectionScreen = () => {
    navigation.navigate("OldDetection");
  };

  // const handleGoVoiceCommands = () => {
  //   navigation.navigate("Voice");
  // };

  // Render each list item
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.listItem}>
      <View style={styles.itemRow}>
        <MaterialCommunityIcons
          name={
            item.type === "Phone"
              ? "cellphone"
              : item.type === "Wallet"
                ? "wallet"
                : item.type === "Keys"
                  ? "key"
                  : item.type === "Bottle"
                    ? "bottle-soda-classic"
                    : item.type === "Watch"
                      ? "watch"
                      : "glasses" // Default icon
          }
          style={[
            styles.addedItemIcon,
            // {
            //   backgroundColor:
            //     selectedType === item.type
            //       ? isDarkMode
            //         ? "#000000" // Selected in dark mode
            //         : "#2C4D76" // Selected in light mode
            //       : isDarkMode
            //       ? "#424548" // Default in dark mode
            //       : "#FFFFFF", // Default in light mode
            // },
          ]}
        // size={20} // Icon size
        // color={selectedType === item.type ? "white" : "black"}
        />
        <Text
          style={[styles.itemText, { fontSize: fontSize, color: fontColor }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name || "Unnamed Item"}
        </Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={{ marginHorizontal: 5 }}
          onPress={() => handleEditItem(item)}
        >
          <Feather name="edit-3" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 5 }}
          onPress={() => handleDeleteItem(item.id)}
        >
          <Ionicon name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Handle camera button press
  const openCamera = (itemId: number) => {
    if (hasPermission) {
      navigation.navigate("Voice");
    } else {
      Alert.alert(
        "Permission Denied",
        "Camera access is needed to take pictures."
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "152332" : colors.lightBlue },
      ]}
    >
      <Modal visible={isEditVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit item name"
              value={itemName}
              onChangeText={setItemName}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSaveEdit}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsEditVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={[
          styles.header,
          { backgroundColor: isDarkMode ? colors.darkBlue : colors.lightBlue },
        ]}
      >
        <View>
          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.searchInput,
                {
                  flex: 1,
                  height: "150%",
                  backgroundColor: isDarkMode ? colors.darkGray : "#FFFFFF",
                },
              ]}
              placeholder="enter item name"
              value={itemName}
              onChangeText={setItemName}
            />
          </View>
        </View>
        <Text
          style={[
            styles.selectTypeLabel,
            { color: isDarkMode ? "#FFFFFF" : "#333" },
          ]}
        >
          Select type
        </Text>
        <View style={styles.radioGroup}>
          {presetData.map((category) => (
            <TouchableOpacity
              key={category.type}
              style={[
                styles.radioButton,
                selectedType === category.type && styles.iconContainerSelected,
              ]}
              onPress={() => setSelectedType(category.type)}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      selectedType === category.type
                        ? isDarkMode
                          ? "#000000" // Selected in dark mode
                          : "#2C4D76" // Selected in light mode
                        : isDarkMode
                          ? "#424548" // Default in dark mode
                          : "#FFFFFF", // Default in light mode
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={
                    category.type === "Phone"
                      ? "cellphone"
                      : category.type === "Wallet"
                        ? "wallet"
                        : category.type === "Keys"
                          ? "key"
                          : category.type === "Bottle"
                            ? "bottle-soda-classic"
                            : category.type === "Watch"
                              ? "watch"
                              : "glasses" // Default icon
                  }
                  size={20} // Icon size
                  color={selectedType === category.type ? "white" : "black"}
                />
              </View>
              <Text
                style={[
                  styles.iconText,
                  { color: selectedType === category.type ? "white" : "black" },
                ]}
              >
                {category.type}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isDarkMode ? colors.darkGray : "#FFFFFF" },
              ]}
              onPress={handleAddItem}
            >
              <Ionicon
                name="add-circle-outline"
                size={24}
                color="black"
                style={{ marginBottom: 2 }}
              />
              <Text style={styles.buttonText}>Add{"\n"}Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.listContainer,
          { backgroundColor: isDarkMode ? colors.darkBlue : colors.lightGray },
        ]}
      >
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          }
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text
                style={[
                  styles.listHeaderText,
                  { marginRight: 10, color: isDarkMode ? "#ffffff" : "#333" },
                ]}
              >
                Rename
              </Text>
              <Text
                style={[
                  styles.listHeaderText,
                  { color: isDarkMode ? "#ffffff" : "#333" },
                ]}
              >
                Delete
              </Text>
            </View>
          }
        />
      </View>

      <View
        style={[
          styles.footer,
          { backgroundColor: isDarkMode ? "#000000" : "#2C4D76" },
        ]}
      >
        <TouchableOpacity style={styles.footerButton} onPress={handleGoCamera}>
          <Ionicon name="camera-outline" size={28} color="white" />
          <Text style={styles.footerButtonText}>Detect</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleGoSettings}
        >
          <Ionicon name="settings-outline" size={28} color="white" />
          <Text style={styles.footerButtonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleGoOldDetectionScreen}
        >
          <Ionicon name="camera-outline" size={28} color="white" />
          <Text style={styles.footerButtonText}>Voice Command</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ObjectsScreen;
