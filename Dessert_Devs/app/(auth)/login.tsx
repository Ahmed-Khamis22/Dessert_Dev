
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
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/(tabs)');
    } catch (error: any) {
      let message = 'An error occurred. Please try again later.';
      if (error.code === 'auth/user-not-found') message = 'User not found. Please check your email.';
      else if (error.code === 'auth/wrong-password') message = 'Wrong password. Please try again.';
      else if (error.code === 'auth/invalid-email') message = 'Invalid email format.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
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

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image 
            source={require('../../assets/images/google-logo.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

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
