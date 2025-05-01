import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/Home'); // أو Products أو أي صفحة البداية
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/teamImage2.jpg')}
        style={styles.logo}
      />
      <Text style={styles.text}>Dessert Devs 🍰</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fb6090',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});
