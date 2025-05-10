import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  hasEggs?: boolean;
  quantity?: number;
  discount?: string;
};

type ParamList = {
  EditProduct: { product: Product };
};

const EditProductScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, "EditProduct">>();
  const navigation = useNavigation();
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(String(product.price));
  const [calories, setCalories] = useState(String(product.calories));
  const [hasEggs, setHasEggs] = useState(product.hasEggs ?? false);
  const [quantity, setQuantity] = useState(String(product.quantity ?? ""));
  const [discount, setDiscount] = useState(product.discount ?? "");
  const [image, setImage] = useState<string>(product.image);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      name,
      description,
      price: parseFloat(price),
      calories: parseInt(calories),
      hasEggs,
      quantity: parseInt(quantity),
      discount,
      image,
    };
    console.log("Updated Product:", updatedProduct);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#d81b60" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Product</Text>
      </View>

      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.changeImageText}>Tap to change image</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Discount (Optional)"
        value={discount}
        onChangeText={setDiscount}
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

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffe6eb",
    flexGrow: 1,
    paddingBottom: 30,
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
  image: {
    width: "90%",
    height: 180,
    borderRadius: 15,
    marginTop: 20,
    alignSelf: "center",
  },
  changeImageText: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#e91e63",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default EditProductScreen;
