import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/AddToCartModalStyles';
import { Shadow } from 'react-native-shadow-2'; // ⬅️ استخدمنا مكتبة الشادو
import { Feather } from '@expo/vector-icons';


type Props = {
  visible: boolean;
  productName: string;
  onClose: () => void;
  onGoToCart: () => void;
};

export default function AddToCartModal({ visible, productName, onClose, onGoToCart }: Props) {
  const router = useRouter();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>

          {/* ✅ Checkmark with glow and sparkles */}
          <View style={styles.checkmarkWrapper}>
            {/* Pink glow using Shadow component */}
            <Shadow
              distance={30}
              startColor="#fb6090aa"
              offset={[0, 10]}
              containerStyle={{
                position: 'absolute',
                top: 0,
                zIndex: 0,
              }}
            >
              <View style={styles.checkmarkGlowCircle} />
            </Shadow>

            <Shadow
              distance={0}
              startColor="#fb6090aa"
              offset={[0, 0]}
              containerStyle={{
                position: 'absolute',
                top: -10,
                zIndex: 0,
              }}
            >
              <View style={styles.checkmarkOuter}>
                <View style={styles.checkmarkCircle}>
                  <Text style={styles.checkmarkIcon}>✔</Text>
                </View>
              </View>
            </Shadow>

            {/* Sparkles */}
            <View style={styles.sparkleWrapper}>
              <View style={styles.sparkleWhite} />
              <View style={styles.sparklePink} />
            </View>
          </View>


          {/* ✅ Title & Message */}
          <Text style={styles.title}>Awesome!</Text>
          <View style={styles.messageBlock}>
            <Text style={styles.message}>You successfully added the below mentioned product</Text>
            <Text style={styles.productName}>({productName})</Text>
            <Text style={styles.message}>to cart!</Text>
          </View>

          {/* ✅ CTA Buttons */}
          <TouchableOpacity onPress={onGoToCart} style={styles.goToCart}>
            <Feather name="shopping-cart" size={24} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.goToCartText}>Go to Cart</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={onClose} style={styles.continueWrapper}>
          <Text style={styles.continueShopping}>Continue Shopping</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>


          {/* Close Button */}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}
