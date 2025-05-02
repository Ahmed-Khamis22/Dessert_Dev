import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: string;
  pieces: string;
  weight: string;
  time: string;
  servings: string;
  rating: string;
  calories: string;
  tag?: string;
};

export default function SearchResultsScreen() {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const products: Product[] = JSON.parse(data as string);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const scrollY = useState(new Animated.Value(0))[0];

  const filtered: Product[] = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Animation Interpolations
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [175, 120],
    extrapolate: "clamp",
  });

  const backButtonTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [-80, 0],
    extrapolate: "clamp",
  });

  const searchBarScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <ImageBackground
          source={require("../assets/images/Back.jpg")}
          style={styles.imageBackground}
          resizeMode="cover"
        >

          <View style={styles.headerContent}>
            <View style={styles.searchWrapper}>
              {/* Back Button */}
              <Animated.View
                style={[
                  styles.circleButton,
                  { transform: [{ translateY: backButtonTranslateY }] },
                ]}
              >
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={20} color="#fff" />
                </TouchableOpacity>
              </Animated.View>

              {/* Search Bar */}
              <Animated.View
                style={[
                  styles.searchContainer,
                  { transform: [{ scale: searchBarScale }] },
                ]}
              >
                <Ionicons
                  name="search"
                  size={20}
                  color="#F8BBD0"
                  style={{ marginHorizontal: 8 }}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search products..."
                  placeholderTextColor="#F8BBD0"
                  value={search}
                  onChangeText={setSearch}
                />
                {search.length > 0 && (
                  <TouchableOpacity onPress={() => setSearch("")}>
                    <Ionicons
                      name="close"
                      size={20}
                      color="#D81B60"
                      style={{ marginHorizontal: 8 }}
                    />
                  </TouchableOpacity>
                )}
              </Animated.View>

              {/* Filter Button */}
              <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="options" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Content */}
      <View style={styles.container}>
        {search.length > 0 && (
          <Text style={styles.resultCount}>
            {filtered.length} {search} found
          </Text>
        )}

        <Animated.FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          renderItem={({ item }: { item: Product }) => {
            const isSelected = selectedProduct === item.id;
            const isFavorite = favorites.includes(item.id);

            return (
              <TouchableOpacity
                style={[
                  styles.card,
                  isSelected && { backgroundColor: "#fde4ec" },
                ]}
                activeOpacity={1}
                onPress={() => {
                  setSelectedProduct(item.id);
                  setTimeout(() => {
                    setSelectedProduct(null);
                    router.push({
                      pathname: './productDetails',
                      params: {
                        ...item,
                        images: JSON.stringify(item.images),
                      },
                    });                    
                  }, 150);
                }}
              >
                <Image source={{ uri: item.images[0] }} style={styles.image} />
                <View style={styles.middleSection}>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.description}
                  </Text>
                </View>
                  <View style={styles.ratingContainer}>
                    <View style={styles.ratingItem}>
                      <Ionicons name="star" size={16} color="#D81B60" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <View style={styles.ratingItem}>
                      <MaterialIcons
                        name="local-fire-department"
                        size={16}
                        color="#FF5722"
                      />
                      <Text style={styles.ratingText}>
                        {item.calories}<Text style={styles.CaloriesText}>Calories</Text>
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.rightSection}>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      style={[
                        styles.favoriteButton,
                        isFavorite && styles.favoriteActive,
                      ]}
                    >
                      <Ionicons
                        name="heart"
                        size={16}
                        color={isFavorite ? "#fff" : "#D81B60"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addButton}>
                      <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
export const options = {
  headerShown: false,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCE4EC",
    padding: 16,
  },
  resultCount: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  middleSection: {
    flex: 1,
    justifyContent: "space-between",
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 16,
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "Black",
  },
  CaloriesText: {
    fontSize: 12,
    marginLeft: 5,
    color: 'rgb(255, 87, 34)',
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D81B60",
  },
  addButton: {
    backgroundColor: "#821d30",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D81B60",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteActive: {
    backgroundColor: "#D81B60",
  },
  headerContainer: {
    width: "100%",
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContent: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 45,
    marginRight: 10,
  },
  filterButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#fb6090",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#D81B60",
  },
  circleButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#fb6090",
    justifyContent: "center",
    alignItems: "center",
  },
});
