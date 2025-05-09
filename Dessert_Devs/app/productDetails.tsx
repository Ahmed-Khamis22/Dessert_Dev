import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ProductDetailsHeader from './appComponents/ProductDetailsHeader';
import AddToCartSection from './appComponents/AddToCartSection';
import AddToCartModal from './appComponents/AddToCartModal';
import { useCart } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, 'productData', id as string);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProduct(snap.data());
        } else {
          console.warn('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const parsedImages: string[] = useMemo(() => {
    try {
      return product?.images || [];
    } catch {
      return [];
    }
  }, [product]);

  // ✅ الحل هنا — استخدم id بدل Date.now()
  const screenKey = useMemo(() => `${id}`, [id]);

  const handleAddToCart = (item: {
    quantity: number;
    size: string;
    type: 'Egg' | 'Eggless';
    glutenFree: boolean;
  }) => {
    addToCart({
      id: id as string,
      name: product.name,
      price: product.price,
      image: parsedImages[0] || '',
      rating: product.rating,
      calories: product.calories,
      quantity: item.quantity,
      cakeSize: item.size,
      type: item.type,
      glutenFree: item.glutenFree,
    });

    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#fb6090" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={{ fontSize: 16 }}>Product not found.</Text>
      </View>
    );
  }

  return (
    <View key={screenKey} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ProductDetailsHeader key={product.name} images={parsedImages} />

        <AddToCartSection
          id={id as string}
          name={product.name}
          description={product.description}
          price={product.price.toString()}
          images={parsedImages}
          tag={product.tag}
          rating={product.rating}
          calories={product.calories}
          onAddToCart={handleAddToCart}
          resetSignal={product.name + '-reset'}
        />
      </ScrollView>

      <AddToCartModal
        visible={modalVisible}
        productName={product.name}
        onClose={() => setModalVisible(false)}
        onGoToCart={() => {
          setModalVisible(false);
          router.push('/cart');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingBottom: 30,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
