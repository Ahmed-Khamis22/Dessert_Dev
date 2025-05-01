import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dummyFavorites = [
  {
    id: '1',
    name: 'Molten Lava Cake',
    image: 'https://cdn.craft.cloud/224393fa-1975-4d80-9067-ada3cb5948ca/assets/detail_White_Cocoa_Oatmeal_Hot_Lava_Cake.png',
    rating: 4.5,
    calories: 250,
    price: '12.00',
  },
  {
    id: '2',
    name: 'Strawberry Cheesecake',
    image: 'https://hips.hearstapps.com/hmg-prod/images/strawberry-cheesecake-1648487650.jpg',
    rating: 5,
    calories: 200,
    price: '15.00',
  },
];

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState(dummyFavorites);

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites added yet 🍰</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>⭐ {item.rating} | 🔥 {item.calories} cal</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
                <Ionicons name="heart-dislike" size={24} color="#fb6090" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#d81b60' },
  empty: { textAlign: 'center', fontSize: 16, color: '#aaa' },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fce4ec',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
  details: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  meta: { fontSize: 12, color: '#999', marginTop: 4 },
  price: { marginTop: 4, fontWeight: 'bold', color: '#6d4c41' },
});
