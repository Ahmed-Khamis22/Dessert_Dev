import React, { useState, useMemo } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ProductDetailsHeader from './appComponents/ProductDetailsHeader';
import AddToCartSection from './appComponents/AddToCartSection';
import AddToCartModal from './appComponents/AddToCartModal';
import { useCart } from '../context/CartContext'; // ✅ استيراد الكارت كونتكست

export default function ProductDetailsScreen() {
const { id, name, description, price, images, tag, rating, calories } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const parsedImages: string[] = (() => {
    try {
      return images ? JSON.parse(images as string) : [];
    } catch (error) {
      return [];
    }
  })();

  const screenKey = useMemo(() => `${name}-${Date.now()}`, [name]);

  const { addToCart } = useCart(); // ✅ استدعاء addToCart من الكارت كونتكست

  // ✅ دالة إضافة المنتج للسلة + فتح المودال
  const handleAddToCart = () => {
    addToCart({
      id: id as string,  // ✅ ناخد id اللي جاي مع المنتج مش random
      name: name as string,
      price: parseFloat(price as string),
      image: parsedImages[0] || '',
      rating: parseFloat(rating as string),
      calories: parseFloat(calories as string),
      quantity: 1,
    });
    setModalVisible(true);
  };
  

  return (
    <View key={screenKey} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* ✅ هيدر عرض صور المنتج */}
        <ProductDetailsHeader
          key={Array.isArray(name) ? name[0] : name}
          images={parsedImages}
        />
        {/* ✅ سكشن الإضافة لعربة التسوق */}
        <AddToCartSection
          id={id as string} // ✅ تبعت الـ id
          name={name as string}
          description={description as string}
          price={price as string}
          images={parsedImages} // ✅ تبعت الـ images اللي عملتلهم parse فوق
          tag={tag as string}
          rating={parseFloat(rating as string)} // ✅ حولتهم أرقام صح
          calories={parseFloat(calories as string)} // ✅ برضه
          onAddToCart={handleAddToCart} // ✅ خلي دالة الإضافة اللي ظابطة
          resetSignal={name + '-reset'}
        />
      </ScrollView>

      {/* ✅ مودال تأكيد إضافة المنتج */}
      <AddToCartModal
        visible={modalVisible}
        productName={name as string}
        onClose={() => setModalVisible(false)}
        onGoToCart={() => {
          setModalVisible(false);
          router.push('/cart'); // تحويل المستخدم على السلة
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
});
