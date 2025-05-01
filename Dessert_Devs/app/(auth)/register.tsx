// app/(auth)/register.tsx
import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)/Home');
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
          placeholder="Enter valid password..."
          secureTextEntry
          placeholderTextColor="#aaa"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        <View style={styles.orSignInSection}>
          <Text style={styles.orSigninText}>OR SIGN IN WITH</Text>
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={() => console.log('Google Sign-In')}>
          <Image 
            source={require('../../assets/images/teamImage2.jpg')}
            style={styles.googleLogo}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.alreadyAccountContainer}>
          <Text style={styles.alreadyAccountText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
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
