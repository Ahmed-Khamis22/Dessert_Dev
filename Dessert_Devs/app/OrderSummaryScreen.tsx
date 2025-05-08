import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CheckoutScreenWrapper from './appComponents/Checkout/CheckoutScreenWrapper';
import { CartContext } from '../context/CartContext';
import OrderSummaryItem from './appComponents/Checkout/OrderSummaryItem';

export default function OrderSummaryScreen() {
  const router = useRouter();
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CheckoutScreenWrapper
      step="order"
      buttonLabel="Continue to Payment"
      onNext={() => router.push('./PaymentScreen')}
      disabled={cartItems.length === 0}
    >
      <Text style={styles.heading}>Order Summary</Text>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => <OrderSummaryItem product={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>
    </CheckoutScreenWrapper>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 8,
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#fff0f4',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fb6090',
  },
});
