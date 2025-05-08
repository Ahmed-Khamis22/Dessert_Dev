import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


interface Props {
  currentStep: 'location' | 'order' | 'payment';
  title: string | React.ReactNode;
  showEdit?: boolean;
  onEditPress?: () => void;
}

export default function CheckoutHeader({
  currentStep,
  title,
  showEdit,
  onEditPress,
}: Props) {
  const steps = ['location', 'order', 'payment'];

  const router = useRouter();


  return (
    <LinearGradient
      colors={['#821d30', '#fb6090']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {/* ⬅️ Back + Title + Edit */}
      <View style={styles.headerRow}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>

        <View style={styles.titleContainer}>
          {typeof title === 'string' ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            title
          )}
        </View>

        {showEdit && (
          <TouchableOpacity style={styles.editBtn} onPress={onEditPress}>
            <Ionicons name="create-outline" size={14} color="#fb6090" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 🟢 Progress Steps */}
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => {
          const isActive = step === currentStep;
          return (
            <View key={step} style={styles.stepItem}>
              <View
                style={[
                  styles.circle,
                  isActive && styles.activeCircle,
                ]}
              />
              <Text style={[styles.stepLabel, isActive && styles.activeLabel]}>
                {step.toUpperCase()}
              </Text>
              {index < steps.length - 1 && <View style={styles.line} />}
            </View>
          );
        })}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#fb6090',
    borderRadius: 20,
  },
  editText: {
    color: '#fb6090',
    fontSize: 12,
    marginLeft: 4,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
    zIndex: 2,
  },
  activeCircle: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fb6090',
    width: 16,
    height: 16,
    bottom:2,
    borderRadius: 8,
    zIndex: 2,
  },  
  stepLabel: {
    color: '#ccc',
    fontSize: 10,
    marginTop: 2,
  },
  activeLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    position: 'absolute',
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    top: 5,
    left: '50%',
    right: 0,
    zIndex: 1,
  },
});
