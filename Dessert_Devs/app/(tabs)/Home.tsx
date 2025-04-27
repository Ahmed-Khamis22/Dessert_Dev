import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Welcome to CakeSmile 🍰</Text>
      <Text style={styles.subtitle}>Enjoy our sweet treats!</Text>

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
        }}
        style={styles.image}
      />

      <Text style={styles.featureTitle}>🌟 Featured</Text>
      <Text style={styles.featureText}>Try our new Molten Lava Cake!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6d4c41',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fb6090',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 16,
    color: '#5d4037',
  },
});
