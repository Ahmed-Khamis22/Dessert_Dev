import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { auth, db } from '../firebase/firebaseConfig';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export default function OrdersScreen() {
  const [address, setAddress] = useState('');
const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        // Get user address
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setAddress(data.address || '');
        }

        // Get user orders
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const orderList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (error) {
        console.error('Error fetching orders or address:', error);
      }
    };

    fetchData();
  }, []);

  const statusSteps = ['placed', 'preparing', 'on-the-way', 'delivered'];

  const renderOrder = ({ item }) => {
    const currentStep = statusSteps.indexOf(item.status);

    return (
      <View
        style={[styles.card, item.status === 'cancelled' && styles.cancelledCard]}
      >
        <Text style={styles.date}>
          🕓 {item.createdAt.toDate().toLocaleString()}
        </Text>
        <Text style={styles.address}>📍 {item.address}</Text>
        <Text style={styles.status}>🚚 Status: {item.status}</Text>
        <Text style={styles.items}>🧁 Items:</Text>
        {item.items.map((product, index) => (
          <Text key={index} style={styles.product}>
            • {product.name} x{product.quantity} - ${product.price}
          </Text>
        ))}
        <Text style={styles.total}>💰 Total: ${item.total}</Text>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          {statusSteps.map((step, index) => {
            const isActive = index <= currentStep;
            return (
              <View key={index} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    isActive ? styles.activeStep : styles.inactiveStep,
                  ]}
                />
                <Text
                  style={[
                    styles.stepLabel,
                    isActive ? styles.activeLabel : styles.inactiveLabel,
                  ]}
                >
                  {step.replace('-', ' ')}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Cancel Button */}
        {item.status === 'pending' && (
          <TouchableOpacity
            onPress={async () => {
              try {
                const ref = doc(db, 'orders', item.id);
                await updateDoc(ref, { status: 'cancelled' });
                Toast.show({
                  type: 'success',
                  text1: 'Order Cancelled',
                });
                setOrders((prev) =>
                  prev.map((order) =>
                    order.id === item.id
                      ? { ...order, status: 'cancelled' }
                      : order
                  )
                );
              } catch (err) {
                console.error('Cancel error:', err);
                Toast.show({
                  type: 'error',
                  text1: 'Cancel Failed',
                });
              }
            }}
            style={styles.cancelBtn}
          >
            <Text style={styles.cancelText}>Cancel Order</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Orders</Text>

      <View style={styles.addressCard}>
        <Text style={styles.addressLabel}>Delivery Address:</Text>
        <Text style={styles.addressText}>
          {address ? address : 'No address saved'}
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fb6090',
    marginBottom: 20,
    textAlign: 'center',
  },
  addressCard: {
    padding: 16,
    backgroundColor: '#fdf2f7',
    borderRadius: 10,
    marginBottom: 20,
  },
  addressLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  addressText: {
    color: '#555',
  },
  card: {
    backgroundColor: '#ffe6eb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    elevation: 2,
  },
  cancelledCard: {
    backgroundColor: '#f0f0f0',
    opacity: 0.7,
  },
  date: { fontWeight: 'bold', marginBottom: 6, color: '#333' },
  address: { marginBottom: 6, color: '#555' },
  status: { marginBottom: 6, color: '#fb6090', fontWeight: 'bold' },
  items: { fontWeight: 'bold', marginTop: 6 },
  product: { marginLeft: 10, color: '#444' },
  total: { marginTop: 10, fontWeight: 'bold', color: '#821d30' },

  // Timeline styles
  timelineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: 4,
  },
  activeStep: {
    backgroundColor: '#fb6090',
  },
  inactiveStep: {
    backgroundColor: '#ccc',
  },
  stepLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#fb6090',
    fontWeight: 'bold',
  },
  inactiveLabel: {
    color: '#aaa',
  },

  cancelBtn: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#821d30',
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
  },
});