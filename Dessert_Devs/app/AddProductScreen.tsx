import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const AddProductScreen: React.FC = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [hasEggs, setHasEggs] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [showDiscountOptions, setShowDiscountOptions] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!name.trim() || !price || !image) {
      Alert.alert("Missing Fields", "Please fill in at least name, price, and image");
      return;
    }

    const newProduct = {
      name: name.trim(),
      price: parseFloat(price),
      calories: parseFloat(calories) || 0,
      description: description.trim(),
      hasEggs,
      images: [image],
      quantity: parseInt(quantity) || 1,
      discount,
      rating: "4.5",
      servings: "",
      time: "",
      weight: "",
      pieces: "",
      tag: hasEggs ? "withEgg" : "eggless",
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "productData"), newProduct);
      Alert.alert("Success", "✅ Product added successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding product: ", error);
      Alert.alert("Error", "❌ Failed to add product");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="#d81b60" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Product</Text>
        </View>

        <Text style={styles.title}>Upload Image</Text>
        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imageText}>Tap to upload product image</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Calories"
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <View style={styles.dropdown}>
          <Text style={styles.dropdownLabel}>Discount</Text>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => setShowDiscountOptions(!showDiscountOptions)}
          >
            <Text style={styles.dropdownText}>
              {discount || "Select Discount"}
            </Text>
          </TouchableOpacity>
          {showDiscountOptions && (
            <View style={styles.dropdownOptions}>
              {["No Discount", "10%", "15%", "25%"].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setDiscount(option);
                    setShowDiscountOptions(false);
                  }}
                >
                  <Text style={styles.dropdownOption}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Contains Eggs?</Text>
          <Switch
            value={hasEggs}
            onValueChange={setHasEggs}
            trackColor={{ false: "#ccc", true: "#f06292" }}
            thumbColor={hasEggs ? "#e91e63" : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    flex: 1,
    backgroundColor: "#ffe6eb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#ec407a",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
    marginRight: 44,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 20,
    marginTop: 20,
  },
  imageUpload: {
    height: 150,
    backgroundColor: "#ffe4ec",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  imageText: { color: "#999" },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  switchLabel: { fontSize: 16, color: "#333" },
  button: {
    backgroundColor: "#e91e63",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  dropdown: { marginBottom: 20, marginHorizontal: 20 },
  dropdownLabel: { fontSize: 16, color: "#333", marginBottom: 5 },
  dropdownBox: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
  },
  dropdownText: { fontSize: 16, color: "#666" },
  dropdownOptions: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dropdownOption: {
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default AddProductScreen;
