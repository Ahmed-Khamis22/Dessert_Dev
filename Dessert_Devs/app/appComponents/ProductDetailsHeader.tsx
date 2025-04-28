import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Image, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

type Props = {
  images: string[];
};

export default function ProductDetailsHeader({ images }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false); // ⭐ أضفنا ستايت للفيفوريت
  const flatListRef = useRef<FlatList<string>>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <View style={styles.headerContainer}>
      <Image source={require('../../assets/images/Header.jpg')} style={styles.bgImage} />
      <View style={styles.overlay} />

      {/* Top Buttons */}
      <View style={styles.topButtons}>
        {/* زر الرجوع */}
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </Pressable>

        {/* زر الفيفوريت */}
        <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={27}
            color={isFavorite ? "#fb6090" : "#fb6090"}
          />
        </Pressable>
      </View>


      {/* Product Image and Dots */}
      <View style={styles.imageArea}>
        <View style={[{ height: 260 }]}>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <View style={{ width: width, alignItems: 'center' }}>
                <Image source={{ uri: item }} style={styles.productImage} />
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            onMomentumScrollEnd={handleScroll}
          />
        </View>

        <View style={styles.dotsRow}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 500,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(130, 29, 48, 0.7)',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 60,
    zIndex: 2,
  },
  backButton: {
    backgroundColor: '#fb6090',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2, 
  },
  
  favoriteButton: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4, 
  },  
  
  iconWrapper: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 50,
  },
  imageArea: {
    marginTop: -10,
    alignItems: 'center',
    zIndex: 3,
  },
  imageWrapper: {
    marginBottom: 16,
    shadowColor: '#fb6090',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 12,
  },
  productImage: {
    width: 230,
    height: 230,
    borderRadius: 115,
    resizeMode: 'cover',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    bottom: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fb6090',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
