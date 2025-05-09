import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/AddToCartModalStyles'; // نستخدم نفس ستايلات المودال القديم
import { Shadow } from 'react-native-shadow-2';
import { Feather } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onTrackOrder: () => void;
};

export default function OrderSuccessModal({ visible, onClose, onTrackOrder }: Props) {
  const router = useRouter();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>

          {/* ✔ Checkmark circle with glow and sparkles */}
          <View style={styles.checkmarkWrapper}>
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

          {/* ✅ Texts */}
          <Text style={styles.title}>Success!</Text>
          <View style={styles.messageBlock}>
            <Text style={styles.message}>Your order has been placed</Text>
            <Text style={styles.message}>successfully 🎉</Text>
          </View>

          {/* ✅ CTA Buttons */}
          <TouchableOpacity onPress={onTrackOrder} style={styles.goToCart}>
            <Feather name="map-pin" size={24} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.goToCartText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.continueWrapper}>
            <Text style={styles.continueShopping}>Continue Shopping</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* ❌ Close */}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}
