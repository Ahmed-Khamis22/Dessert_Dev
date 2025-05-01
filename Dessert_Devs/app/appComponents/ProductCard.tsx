import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

type ProductProps = {
  id: string;
  name: string;
  description: string;
  price: string;
  tag?: string;
  rating: number;
  calories: number;
  images: string[]; // بدل image واحد، images array
};

const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png';

export default function ProductCard({ id, name, description, price, tag, rating, calories, images }: ProductProps) {
  const displayDescription = description.length > 70 ? `${description.slice(0, 70)}...` : description;

  const priceNumber = parseFloat(price.replace('$', ''));
  const discountMatch = tag?.match(/(\d+)%\s*OFF/i);
  const discountPercent = discountMatch ? parseFloat(discountMatch[1]) : 0;
  const originalPrice = discountPercent ? (priceNumber / (1 - discountPercent / 100)).toFixed(2) : null;

  return (
    <Link
      href={{
        pathname: '/productDetails',
        params: {
          id, // ✨ لازم تبعته!
          name,
          description,
          price,
          tag,
          rating,
          calories,
          images: JSON.stringify(images),
        },
      }}
      asChild
    >

      <TouchableOpacity style={styles.productContainer}>
        {tag && (
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        )}
        <Image
          source={{ uri: images?.[0] || defaultImage }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productRating}>★★★★★</Text>
        <Text style={styles.productDescription}>{displayDescription}</Text>
        <View style={styles.priceContainer}>
          {originalPrice && <Text style={styles.oldPrice}>${originalPrice}</Text>}
          <Text style={styles.productPrice}>{price}</Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add to Order</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '45%',
    marginHorizontal: '2.5%',
    position: 'relative',
    minHeight: 300,
    justifyContent: 'space-between',
  },
  tagContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ff4081',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 30,
    marginBottom: 10,
  },
  productName: {
    color: '#d81b60',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  productRating: {
    color: '#FFD700',
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  productDescription: {
    color: '#5d4037',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    fontSize: 14,
    marginRight: 5,
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#6d4c41',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f48fb1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
