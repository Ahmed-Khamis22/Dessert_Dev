import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import MapView, { Marker } from 'react-native-maps';

// ✅ Interface لتفادي أخطاء الـ "never"
interface OrderData {
  status: string;
  address: string;
  createdAt: any;
  total: number;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  coords?: {
    latitude: number;
    longitude: number;
  };
}

export default function TrackOrderScreen() {
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, 'orders', orderId as string); // ✅ Cast to string
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder(docSnap.data() as OrderData); // ✅ Cast to known interface
        } else {
          console.warn('Order not found');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧾 Order Details</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>🚚 {order.status}</Text>

      <Text style={styles.label}>Delivery Address:</Text>
      <Text style={styles.value}>📍 {order.address}</Text>

      <Text style={styles.label}>Created At:</Text>
      <Text style={styles.value}>
        🕓 {order.createdAt?.toDate().toLocaleString()}
      </Text>

      <Text style={styles.label}>Items:</Text>
      {order.items.map((item, index) => (
        <Text key={index} style={styles.item}>
          • {item.name} ×{item.quantity} — ${item.price}
        </Text>
      ))}

      <Text style={styles.label}>Total:</Text>
      <Text style={styles.total}>💰 ${order.total}</Text>

      {order.coords && Platform.OS !== 'web' && (
        <MapView
          style={styles.map}
          region={{
            latitude: order.coords.latitude,
            longitude: order.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: order.coords.latitude,
              longitude: order.coords.longitude,
            }}
            title="Delivery Location"
            description={order.address}
          />
        </MapView>
      )}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fb6090',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  value: {
    fontSize: 15,
    marginBottom: 10,
    color: '#444',
  },
  item: {
    marginLeft: 10,
    marginBottom: 4,
    color: '#555',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#821d30',
    marginTop: 8,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
});
