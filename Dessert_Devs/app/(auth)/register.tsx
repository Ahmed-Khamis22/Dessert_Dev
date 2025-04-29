// app/(auth)/register.tsx

import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const backgroundImg = {
  uri: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80',
};

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)');
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('email-already-in-use')) {
          Alert.alert('Error', 'This email is already registered!');
        } else {
          Alert.alert('Error', error.message);
        }
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.textTitle}>Create Account 🍰</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              placeholderTextColor="#aaa"
              autoCapitalize="none"
            />
            <TouchableOpacity
              // style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              {/* <Ionicons
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={24}
                color="#d81b60"
              /> */}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  formContainer: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgba(115, 25, 49, 0.90)',
    padding: 24,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  textTitle: {
    color: '#d81b60',
    fontSize: 38,
    fontFamily: 'GreatVibes',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 14,
    // paddingHorizontal: 15,
    height: 50,
    color: '#333',
    fontSize: 15,
    // paddingRight: 50,
    marginBottom: 16,
    padding: 10
  },
  passwordWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 13,
  },
  button: {
    backgroundColor: '#f48fb1',
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#fcf1f4',
    fontSize: 16,
  },
  loginLink: {
    color: '#d81b60',
    fontSize: 15,
    fontWeight: 'bold',
  },
});