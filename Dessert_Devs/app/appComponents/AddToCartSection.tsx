import React, { useState , useEffect , useCallback} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

type Props = {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  tag?: string;
  rating: number;
  calories: number;
  onAddToCart: () => void;
  resetSignal?: string;
};

export default function AddToCartSection({ name, description, price, tag, rating, calories, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<'Egg' | 'Eggless'>('Egg');
  const [selectedSize, setSelectedSize] = useState('6" Cake | Serves 6-8');
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const cakeSizes = ['6" Cake | Serves 6-8', '7"', '8"', '9"'];
  const maxDescLength = 120;
  const isLongDesc = (description?.length ?? 0) > maxDescLength;
  const displayText = showFullDesc ? description : (description?.slice(0, maxDescLength) ?? '');


  // ✨ هنا اضيف الكود اللي قلنا عليه ✨
  useFocusEffect(
    useCallback(() => {
      setQuantity(1);
      setSelectedOption('Egg');
      setSelectedSize('6" Cake | Serves 6-8');
      setIsGlutenFree(false);
      setShowFullDesc(false);
    }, [])
  );

  return (
    <View style={styles.container}>
      
      {/* Quantity + Customize */}
      <View style={styles.comboRow}>
        <View style={styles.comboWrapper}>
          <View style={styles.quantityWrapper}>
            <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={styles.qtyBtnCircle}>
              <Ionicons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.qtyNumber}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={styles.qtyBtnCircle}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.customizeBtn}>
            <Text style={styles.customizeText}>Customize</Text>
            <Ionicons name="chevron-forward" size={16} color="#fff" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Name + Price */}
      <View style={styles.detailsRow}>
        <Text style={styles.productName} numberOfLines={1}>{name}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.dollar}>$</Text>
          <Text style={styles.productPrice}>{price}</Text>
        </View>
      </View>

      {/* Rating + Calories */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="star" size={14} color="#fb6090" />
          <Text style={styles.metaValue}>{rating}</Text> 
          {/* ✨ هنا عرضت الريتنج الحقيقي */}
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="flame" size={14} color="#fb6090" />
          <Text style={styles.metaValue}>{calories}</Text> 
          {/* ✨ هنا عرضت الكالوريز الحقيقية */}
          <Text style={styles.metaSubText}>Calories</Text>
        </View>
      </View>

      {/* Egg/Eggless */}
      <View style={styles.optionRow}>
        <TouchableOpacity style={styles.radioOption} onPress={() => setSelectedOption('Egg')}>
          <View style={styles.radioCircle}>{selectedOption === 'Egg' && <View style={styles.radioDot} />}</View>
          <Text style={styles.radioLabel}>Egg</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioOption} onPress={() => setSelectedOption('Eggless')}>
          <View style={styles.radioCircle}>{selectedOption === 'Eggless' && <View style={styles.radioDot} />}</View>
          <Text style={styles.radioLabel}>Eggless</Text>
        </TouchableOpacity>
      </View>

      {/* Cake Size */}
      <View style={styles.cakeSizeRow}>
        <Text style={styles.cakeSizeLabel}>Cake Size:</Text>
        <View style={styles.cakeSizeOptions}>
          {cakeSizes.map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              style={[styles.cakeSizeButton, selectedSize === size && styles.selectedCakeSize]}
            >
              <Text style={[styles.cakeSizeText, selectedSize === size && styles.selectedCakeSizeText]}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {displayText}
          {(!showFullDesc && isLongDesc) && '...'}
        </Text>
        {isLongDesc && (
          <TouchableOpacity onPress={() => setShowFullDesc(prev => !prev)}>
            <Text style={styles.readMore}>{showFullDesc ? 'Read Less' : 'Read More...'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Gluten Free */}
      <View style={styles.glutenWrapper}>
        <TouchableOpacity onPress={() => setIsGlutenFree(prev => !prev)} style={styles.glutenRow}>
          <Ionicons name={isGlutenFree ? 'checkbox' : 'square-outline'} size={20} color="#fb6090" />
          <Text style={styles.glutenLabel}>Gluten Free</Text>
          <Text style={styles.dollar2}>$</Text>
          <Text style={styles.glutenPrice}>10.00</Text>
        </TouchableOpacity>
      </View>

      {/* Add To Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCart}>
        <Ionicons name="cart-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 30,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -160, 
    top: 50,
  },
  comboRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: -30,
    paddingHorizontal: 20,
  },
  comboWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    overflow: 'visible',
    top: -15,
    marginTop: 15,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fb6090',
    paddingVertical: 4,
    borderRadius: 50,
    zIndex: 1,
  },
  qtyBtnCircle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtyNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ec4e7a',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  customizeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#821d30',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginLeft: -15,
    top: 0,
  },
  customizeText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: -16,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3d3d3d',
    flex: 1,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollar: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fb6090',
    marginRight: 2,
    top: 5,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3d3d3d',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 18,
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaValue: {
    marginLeft: 4,
    color: '#fb6090',
    fontWeight: 'bold',
    fontSize: 12,
  },
  metaSubText: {
    marginLeft: 4,
    color: '#999',
    fontSize: 10,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fb6090',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fb6090',
  },
  radioLabel: {
    color: '#3d3d3d',
    fontSize: 17,
  },
  cakeSizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    gap: 10,
    width: '100%',
  },
  cakeSizeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3d3d3d',
  },
  cakeSizeOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'nowrap',
    flexShrink: 1,
  },
  cakeSizeButton: {
    height: 40,
    minWidth: 40,
    borderRadius: 20,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fde2ea',
  },
  selectedCakeSize: {
    backgroundColor: '#fdd6df',
    borderColor: '#fdd6df',
  },
  cakeSizeText: {
    color: '#3d3d3d',
    fontWeight: 'bold',
    fontSize: 12,
  },
  selectedCakeSizeText: {
    color: '#3d3d3d',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  readMore: {
    color: '#fb6090',
    fontWeight: 'bold',
    marginTop: 4,
  },
  glutenWrapper: {
    alignItems: 'center',
    marginBottom: -15,
  },
  glutenRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  glutenLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3d3d3d',
    marginLeft: 6,
  },
  dollar2: {
    color: '#fb6090',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  glutenPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#fb6090',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
