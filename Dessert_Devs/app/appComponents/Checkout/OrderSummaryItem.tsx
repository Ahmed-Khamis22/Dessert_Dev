import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../../context/CartContext';
import { Product } from '../../../context/CartContext';


interface Props {
  product: Product;
}

export default function OrderSummaryItem({ product }: Props) {
  const { removeItem } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.content}>
        {/* اسم + السعر */}
        <View style={styles.topRow}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${(product.price * product.quantity).toFixed(2)}</Text>
        </View>
        
        {(product.cakeSize || product.type || product.glutenFree) && (
            <Text style={styles.customizationInfo}>
              {product.cakeSize ? product.cakeSize : ''}
              {product.type ? ` | ${product.type}` : ''}
              {product.glutenFree ? ' | Gluten Free' : ''}
            </Text>
          )}
        
        {/* الريتنج + السعرات */}
        <View style={styles.ratingCalories}>
          <Ionicons name="star" size={14} color="#fb6090" />
          <Text style={styles.ratingText}>{product.rating}</Text>
          <Text style={styles.caloriesText}>| 🔥 {product.calories} Calories</Text>
        </View>

        {/* الكمية */}
        <Text style={styles.quantity}>Quantity: {product.quantity}</Text>

        {/* زر الحذف */}
        <TouchableOpacity onPress={() => removeItem(product.id)} style={styles.removeIcon}>
          <Ionicons name="trash" size={18} color="#999" />
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
    marginBottom: 12,
    padding: 14,
    borderRadius: 16,
    elevation: 2,
    position: 'relative',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
  },
  customizationInfo: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#999',
    marginTop: 2,
  },  
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    bottom: -40,
  },
  sizeText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  ratingCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#fb6090',
    marginLeft: 4,
  },
  caloriesText: {
    fontSize: 12,
    color: '#e57373',
    marginLeft: 10,
  },
  quantity: {
    fontSize: 13,
    color: '#333',
    marginTop: 4,
  },
  removeIcon: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    padding: 4,
    color:'#777',
  },
});
