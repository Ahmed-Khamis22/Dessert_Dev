// app/(tabs)/menu.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { name: 'Chocolate Cakes', icon: 'cafe' },
  { name: 'Cheesecakes', icon: 'ice-cream' },
  { name: 'Cookies', icon: 'cookie' },
  { name: 'Middle Eastern', icon: 'restaurant' },
  { name: 'Sugar Free', icon: 'leaf' },
  { name: 'Eggless', icon: 'egg-outline' },
];

export default function MenuScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍰 Categories</Text>
      {categories.map((cat, index) => (
        <TouchableOpacity key={index} style={styles.card}>
          <Ionicons name={cat.icon as any} size={24} color="#fb6090" style={{ marginRight: 10 }} />
          <Text style={styles.text}>{cat.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fb6090',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fce4ec',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
