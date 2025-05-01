import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CartItem from './appComponents/CartItem';
import { CartContext } from './../context/CartContext';
import { Ionicons } from '@expo/vector-icons';



export default function CartScreen() {
  const navigation = useNavigation();
  const { cartItems, total, discount, applyDiscount } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState('');

  const handleApplyDiscount = () => {
    applyDiscount(promoCode);
    setPromoCode('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
           <Ionicons name="chevron-back" size={24} color="#d81b60" />
        </TouchableOpacity>
        <Text style={styles.title}>View My Cart</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartItem key={item.id} product={item} />
          ))
        ) : (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        )}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter promo code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={handleApplyDiscount}
          >
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text>Item Total</Text>
          <Text>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text>Discount</Text>
          <Text>-${discount.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text>Delivery</Text>
          <Text>Free</Text>
        </View>
        <View style={styles.divider} />
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalText}>Total Cost</Text>
          <Text style={styles.totalText}>${(total - discount).toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>
            Checkout - ${(total - discount).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4ec', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ec407a', 
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 20,
    color: '#ec407a',
    textAlign: 'center',
    lineHeight: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginRight: 44, 
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  promoContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f8bbd0',
    padding: 8,
    marginBottom: 12,
  },
  promoInput: {
    flex: 1,
    fontSize: 14,
    padding: 10,
    color: '#000',
  },
  applyButton: {
    backgroundColor: '#ec407a',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f8bbd0',
  },
  divider: {
    height: 1,
    backgroundColor: '#f8bbd0',
    marginVertical: 12,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#d81b60',
  },
  checkoutBtn: {
    marginTop: 16,
    backgroundColor: '#d81b60',
    padding: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

