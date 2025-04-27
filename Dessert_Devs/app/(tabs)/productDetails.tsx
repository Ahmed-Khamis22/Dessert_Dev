import React, { useState, useMemo } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ProductDetailsHeader from '../appComponents/ProductDetailsHeader';
import AddToCartSection from '../appComponents/AddToCartSection';
import AddToCartModal from '../appComponents/AddToCartModal';

export default function ProductDetailsScreen() {
  const { name, description, price, tag, images } = useLocalSearchParams();
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

  return (
    <View key={screenKey} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ProductDetailsHeader key={Array.isArray(name) ? name[0] : name} images={parsedImages} />
        <AddToCartSection
          name={name as string}
          description={description as string}
          price={price as string}
          tag={tag as string}
          onAddToCart={() => setModalVisible(true)}
          resetSignal={name + '-reset'} // دايما قيمة جديدة حتى لو نفس المنتج
        />

      </ScrollView>

      <AddToCartModal
        visible={modalVisible}
        productName={name as string}
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
});
