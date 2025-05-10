// app/(auth)/register.tsx
import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { register } from '../../firebase/firebase_auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !userName) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, userName);
      
      Alert.alert(
        'Verification Email Sent',
        'Please check your email to verify your account before logging in.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/login'),
          }
        ]
      );
      router.replace('/(auth)/login');
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      setError(error.message);
      console.error('Registration error:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
        default:
          console.error('Registration error:', error);
      }
      
      Alert.alert('Registration Error', errorMessage);
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
        <Text style={styles.label}>USERNAME:</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Choose a username..."
          placeholderTextColor="#aaa"
          autoCapitalize="words"
        />

        <Text style={styles.label}>EMAIL:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Your email address..."
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>PASSWORD:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="At least 6 characters..."
          secureTextEntry
          placeholderTextColor="#aaa"
          autoCapitalize="none"
        />
        <Text style={styles.label}>{error}</Text>
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>REGISTER</Text>
          )}
        </TouchableOpacity>

        <View style={styles.alreadyAccountContainer}>
          <Text style={styles.alreadyAccountText}>Already have an account? </Text>
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/login')}
            disabled={loading}
          >
            <Text style={styles.signinLink}>Sign in</Text>
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
  registerButton: {
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
  alreadyAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  alreadyAccountText: {
    color: '#3d3d3d',
    fontSize: 16,
  },
  signinLink: {
    color: '#fb6090',
    fontSize: 16,
    fontWeight: 'bold',
  },
});