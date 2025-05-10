import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import * as ImagePicker from "expo-image-picker";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [hasEggs, setHasEggs] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, "productData", id as string);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setName(data.name || "");
          setPrice(data.price?.toString() || "");
          setCalories(data.calories?.toString() || "");
          setDescription(data.description || "");
          setHasEggs(data.hasEggs || false);
          setQuantity(data.quantity?.toString() || "");
          setDiscount(data.discount || "");
          setImage(data.images?.[0] || null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        Alert.alert("Error", "Could not load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "productData", id as string), {
        name,
        price: parseFloat(price),
        calories: parseFloat(calories),
        description,
        hasEggs,
        quantity: parseInt(quantity),
        discount,
        images: image ? [image] : [],
      });
      Alert.alert("Updated", "Product updated successfully");
      router.replace("/AdminDashboardScreen");
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", "Could not update product");
    }
  };

  const handleDelete = async () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "productData", id as string));
            Alert.alert("Deleted", "Product deleted successfully");
            router.replace("/AdminDashboardScreen");
          } catch (error) {
            console.error("Delete error:", error);
            Alert.alert("Error", "Could not delete product");
          }
        },
      },
    ]);
  };

  if (loading)
    return (
      <View style={{ marginTop: 50, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#d81b60" />
        <Text style={{ marginTop: 10 }}>Loading product...</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#d81b60" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Product</Text>
      </View>

      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Upload Image</Text>
        )}
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Calories" value={calories} onChangeText={setCalories} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Discount" value={discount} onChangeText={setDiscount} />
      <TextInput style={[styles.input, { height: 80 }]} placeholder="Description" value={description} onChangeText={setDescription} multiline />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Contains Eggs?</Text>
        <Switch value={hasEggs} onValueChange={setHasEggs} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Product</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#f44336", marginTop: 10 }]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: "#ec407a",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  imageUpload: {
    margin: 20,
    height: 150,
    backgroundColor: "#ffe4ec",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  imageText: { color: "#999" },
  input: {
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  switchLabel: { fontSize: 16, color: "#333" },
  button: {
    backgroundColor: "#e91e63",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 18 },
});
