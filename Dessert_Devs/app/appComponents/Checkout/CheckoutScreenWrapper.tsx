import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CheckoutHeader from './CheckoutHeader';

interface Props {
  step: 'location' | 'order' | 'payment';
  children: React.ReactNode;
  buttonLabel: string;
  onNext: () => void;
  disabled?: boolean;
  showEdit?: boolean;
  onEditPress?: () => void;
}


export default function CheckoutScreenWrapper({
  step,
  children,
  buttonLabel,
  onNext,
  disabled = false,
  showEdit = false,
  onEditPress,
}: Props) {
  const getHeaderTitle = () => {
    switch (step) {
      case 'location':
        return (
          <Text style={styles.title}>
            <Text style={styles.bold}>Deliver to : </Text>
            Choose Delivery Location
          </Text>
        );
      case 'order':
        return (
          <Text style={styles.title}>
            <Text style={styles.bold}>Order Summary</Text>
          </Text>
        );
      case 'payment':
        return (
          <Text style={styles.title}>
            <Text style={styles.bold}>Payment : </Text>
            Choose Payment Options
          </Text>
        );
      default:
        return null;
    }
  };
  

  return (
    <View style={styles.container}>
      {/* ✅ الهيدر العلوي */}
      <CheckoutHeader
        currentStep={step}
        title={getHeaderTitle()}        
        showEdit={showEdit}
        onEditPress={onEditPress}
      />

      {/* ✅ المحتوى الأساسي */}
      <View style={styles.content}>
        {children}
      </View>

      {/* ✅ زر الإجراء */}
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabledButton]}
        disabled={disabled}
        onPress={onNext}
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
  },
  bold: {
    fontWeight: 'bold',
  },  
  button: {
    backgroundColor: '#fb6090',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
