import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import CheckoutScreenWrapper from './appComponents/Checkout/CheckoutScreenWrapper';
import OrderSuccessModal from './appComponents/OrderSuccessModal'; // ✅ مودال النجاح بنفس شكل AddToCart

const paymentMethods = [
  {
    id: 'mastercard',
    name: 'Master Card',
    logo: require('../assets/images/mastercard.png'),
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    logo: require('../assets/images/cod.png'),
  },
];

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState('mastercard');
  const [balance, setBalance] = useState(12550); // رصيد ثابت وهمي
  const [orderTotal, setOrderTotal] = useState(22.5); // إجمالي الطلب
  const [successVisible, setSuccessVisible] = useState(false);

  const router = useRouter();

  const handlePlaceOrder = () => {
    if (selectedMethod === 'mastercard') {
      if (orderTotal > balance) {
        Alert.alert(
          'Insufficient Balance',
          'You do not have enough balance to place this order.'
        );
      } else {
        setBalance((prev) => prev - orderTotal);
        setSuccessVisible(true); // ✅ Show modal
      }
    } else {
      setSuccessVisible(true); // ✅ Show modal for COD
    }
  };

  return (
    <>
      <CheckoutScreenWrapper
        step="payment"
        buttonLabel="Place Order"
        onNext={handlePlaceOrder}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <Text style={styles.balanceLabel}>
            Card Balance: ${balance.toFixed(2)}
          </Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.card,
                selectedMethod === method.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.cardContent}>
                <Image source={method.logo} style={styles.icon} />
                <Text style={styles.label}>{method.name}</Text>
                <View style={styles.radioCircle}>
                  {selectedMethod === method.id && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {selectedMethod === 'cod' && (
            <Text style={styles.codNote}>Pay with Cash on Delivery Time</Text>
          )}
        </ScrollView>
      </CheckoutScreenWrapper>

      {/* ✅ مودال النجاح بالشكل الجديد */}
      <OrderSuccessModal
        visible={successVisible}
        onClose={() => {
          setSuccessVisible(false);
          router.push('/(tabs)/Home');
        }}
        onTrackOrder={() => {
          setSuccessVisible(false);
          router.push('/trackOrder');
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  balanceLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedCard: {
    borderColor: '#fb6090',
    borderWidth: 2,
    backgroundColor: '#fff0f4',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#fb6090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fb6090',
  },
  codNote: {
    marginTop: 16,
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
  },
});
