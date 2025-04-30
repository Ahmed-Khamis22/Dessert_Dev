import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from './authContext';
import { useRouter } from 'expo-router';

const Header = () => {
    const { user, logout } = useAuth();  // هنا بتجيب الـ user من الـ Context
    const router = useRouter();
  
    const handleLogout = async () => {
      try {
        await logout();
        router.replace('/login'); // توجيه المستخدم إلى صفحة login بعد الخروج
      } catch (error: any) {
        console.error('Logout Error:', error.message);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Our Project</Text>
        {user ? (
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => router.push('/login')} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    color: '#ff9800',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Header;
