import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import * as Location from 'expo-location';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';


export default function LocationScreen() {
  const [manualAddress, setManualAddress] = useState('');
  const [gpsAddress, setGpsAddress] = useState('');
const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const router = useRouter();


  const handleUseCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission denied',
          text2: 'Location access is required',
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coordData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCoords(coordData);

      const geocode = await Location.reverseGeocodeAsync(coordData);

      if (geocode.length > 0) {
        const { street, city, region, country } = geocode[0];
        const fullAddress = `${street || ''}, ${city || ''}, ${region || ''}, ${country || ''}`;
        setGpsAddress(fullAddress);
        setManualAddress(fullAddress);
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to get location',
      });
    }
  };

  const handleSaveAddress = async () => {
    const user = auth.currentUser;
    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'User not logged in',
      });
      return;
    }

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          address: manualAddress,
          coords: coords,
        },
        { merge: true }
      );
      Toast.show({
        type: 'success',
        text1: 'Address Saved',
        text2: 'Your delivery location has been updated!',
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Save Failed',
      });
    }
    router.back(); // أو router.push('/checkout') لو عايزة تروحي لصفحة معينة

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your address manually"
        value={manualAddress}
        onChangeText={setManualAddress}
      />

      <TouchableOpacity onPress={handleUseCurrentLocation} style={styles.gpsButton}>
        <Text style={styles.gpsButtonText}>Use Current Location</Text>
      </TouchableOpacity>

      {gpsAddress !== '' && (
        <Text style={styles.gpsText}>📍 {gpsAddress}</Text>
      )}

      {/* ✅ Show Map ONLY after pressing the button */}
      {coords && Platform.OS !== 'web' && (
        <MapView
          style={styles.map}
          region={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker coordinate={coords} title="Your Location" />
        </MapView>
      )}

      {/* 🖥️ Fallback for web */}
      {coords && Platform.OS === 'web' && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${coords.latitude},${coords.longitude}&zoom=15&size=600x300&markers=color:red%7C${coords.latitude},${coords.longitude}&key=YOUR_API_KEY`,
          }}
          style={styles.map}
        />
      )}

      <TouchableOpacity onPress={handleSaveAddress} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fb6090',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  gpsButton: {
    backgroundColor: '#fb6090',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  gpsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gpsText: {
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#821d30',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});