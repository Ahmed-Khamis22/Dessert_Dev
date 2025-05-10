import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebaseConfig"; // تأكد من المسار
import { deleteDoc, doc } from "firebase/firestore"; // فوق



const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<Product>
);

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


const AdminDashboardScreen: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "productData"));
      const fetched: Product[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ ...(doc.data() as Product), id: doc.id });
      });
      setProducts(fetched);
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
    }
  };

  fetchProducts();
}, []);


  const scrollY = new Animated.Value(0);


const handleDelete = async (id: string) => {
  try {
    await deleteDoc(doc(db, "productData", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  } catch (error) {
    console.error("Delete failed:", error);
  }
};


  const handleEdit = (product: Product) => {
    router.push({
      pathname: "/EditProductScreen",
      params: { id: product.id },
    });

  };

  const filteredProducts = products.filter((product) =>
    (product?.name?.toLowerCase() || "").includes(search?.toLowerCase() || "")
  );


  const renderProductItem = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() => handleEdit(item)}
      style={({ pressed }) => [
        styles.card,
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
          shadowColor: pressed ? "#e91e63" : "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <View style={styles.row}>
          <MaterialCommunityIcons name="star" size={14} color="#e91e63" />
          <Text style={styles.meta}>4.5</Text>
          <MaterialCommunityIcons
            name="fire"
            size={14}
            color="#f44336"
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.meta}>{item.calories} Calories</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Text style={styles.price}>
          ${typeof item.price === "number" ? item.price.toFixed(2) : "N/A"}
        </Text>
        <View style={styles.actionIcons}>
          <Pressable
            onPress={() => handleEdit(item)}
            style={({ pressed }) => [
              styles.iconButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <MaterialCommunityIcons name="pencil" size={22} color="#e91e63" />
          </Pressable>
          <Pressable
            onPress={() => handleDelete(item.id)}
            style={({ pressed }) => [
              styles.iconButton,
              { opacity: pressed ? 0.6 : 1, marginLeft: 10 },
            ]}
          >
            <MaterialCommunityIcons name="delete" size={22} color="#f44336" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, -100],
                extrapolate: "clamp",
              }),
            },
          ],
        }]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </Pressable>
        <TextInput
          style={styles.searchInput}
          placeholder=" Search "
          value={search}
          onChangeText={setSearch}
        />
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          onPress={() => router.push("/AddProductScreen")}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        </Pressable>
      </Animated.View>

      <AnimatedFlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6eb",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
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
    padding: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#e91e63",
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff0f5",
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  desc: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  meta: {
    fontSize: 12,
    color: "#444",
    marginLeft: 4,
  },
  actions: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e91e63",
  },
  actionIcons: {
    flexDirection: "row",
    marginTop: 5,
  },
  iconButton: {
    padding: 5,
  },
});

export default AdminDashboardScreen;
