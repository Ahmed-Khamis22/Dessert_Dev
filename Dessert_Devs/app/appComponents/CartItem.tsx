import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

interface CartItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    calories: number;
    quantity: number;
  };
}

export default function CartItem({ product }: CartItemProps) {
  const { updateQuantity, removeItem } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        
        <Text style={styles.subDetails}>
          ⭐ {product.rating} | 🔥 {product.calories} Calories
        </Text>

        <Text style={styles.price}>
          ${(product.price * product.quantity).toFixed(2)}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => updateQuantity(product.id, product.quantity - 1)}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{product.quantity}</Text>

          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => updateQuantity(product.id, product.quantity + 1)}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removeItem(product.id)}
        >
          <Ionicons name="trash-bin" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  subDetails: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  price: {
    position: 'absolute',
    right: 0,
    top: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fce4ec',
    borderRadius: 24,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  removeButton: {
    position: 'absolute',
    top: 30,
    right: 0,
    padding: 4,
  },
});
