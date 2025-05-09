
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,

} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

// import { login } from '../firebase/firebase_auth';
import { login } from '../../firebase/firebase_auth';
// import { getUser } from '@/firebase/firestor_fun';
import { getUser } from '../../firebase/firestor_fun';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const storeUserData = async (user: any) => {
    try {
      const userData = await getUser(user.uid);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
      throw new Error('Failed to save user data locally');
    }
  };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const cred = await login(email, password);
      
      if (!cred.user.emailVerified) {
        Alert.alert(
          'Email Not Verified',
          'Please verify your email address before logging in. Check your inbox for the verification link.' );
        await AsyncStorage.removeItem('user'); // Clear any partial data
        return;
      }

      // Store user data in AsyncStorage
      await storeUserData(cred.user);
      
      // Navigate to home screen after successful login
      router.replace('/(tabs)/Home');
      
    } catch (error: any) {
      let message = 'An error occurred. Please try again later.';
      console.error('Login error:', error);
      setError(error.message);
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'User not found. Please check your email or sign up.';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email format. Please enter a valid email.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many failed attempts. Account temporarily disabled. Try again later or reset your password.';
          break;
        case 'auth/network-request-failed':
          message = 'Network error. Please check your internet connection.';
          break;
      }
      
      Alert.alert('Login Error', message);
      console.error('Login error:', error);
      
      // Clear sensitive data from storage if login fails
      try {
        await AsyncStorage.removeItem('user');
      } catch (storageError) {
        console.error('Failed to clear user data:', storageError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandName}>Dessert Devs</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>EMAIL:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email address..."
          placeholderTextColor="#aaa"
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>PASSWORD:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter valid password..."
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={setPassword}
        />

          <Text style={styles.label}>{error}</Text>
        {/* <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Coming soon!')}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        <View style={styles.orSignInSection}>
          <Text style={styles.orSigninText}>OR SIGN IN WITH</Text>
        </View>

        {/* <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image 
            source={require('../../assets/images/teamImage2.jpg')}
            style={styles.googleLogo}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity> */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(220,96,129)',
  },
  menuButton: {
    backgroundColor: '#',
    padding: 10,
    borderRadius: 8,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    marginBottom: 16,
  },
  // forgotPassword: {
  //   textAlign: 'center',
  //   color: '#821d30',
  //   marginTop: 8,
  // },
  loginButton: {
    backgroundColor: '#fb6090',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orSignInSection: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  orSigninText: {
    color: '#3d3d3d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  googleButtonText: {
    color: '#757575',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#3d3d3d',
    fontSize: 16,
  },
  signupLink: {
    color: '#fb6090',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
