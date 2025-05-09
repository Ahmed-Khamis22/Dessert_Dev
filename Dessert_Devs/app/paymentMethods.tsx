import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentMethodScreen() {
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [balance, setBalance] = useState(12550.00);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false); // State for loading

  const handlePay = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("Please enter a valid amount");
      return;
    }
  
    if (amountNum > balance) {
      alert("Insufficient balance");
      return;
    }
  
    setBalance(prev => prev - amountNum);
    alert(`Payment successful! $${amountNum.toFixed(2)} deducted.`);
    setAmount('');
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fb6090" />
        <Text style={styles.loadingText}>Processing Payment...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backIcon}>
        <Ionicons name="chevron-back" size={24} color="#fb6090" />
      </TouchableOpacity>
      <Text style={styles.title}>Add your Card</Text>
      <View style={styles.cardVisual}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balance}>
          ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
        <Text style={styles.cardNumberPreview}>1234 5678 9100 1699</Text>
        <Text style={styles.expiryPreview}>09/27</Text>
        <Image
          source={require("../assets/images/mastercard.png")} // Ensure this path is correct
          style={styles.cardLogo}
        />
      </View>
      <View style={styles.formSection}>
        <Text style={styles.label}>Your Card No</Text>
        <View style={styles.cardInputsRow}>
          {cardNumber.map((val, i) => (
            <TextInput
              key={i}
              style={styles.cardInput}
              keyboardType="number-pad"
              maxLength={4}
              value={val}
              onChangeText={(text) => {
                const newNumbers = [...cardNumber];
                newNumbers[i] = text;
                setCardNumber(newNumbers);
              }}
            />
          ))}
        </View>

        <Text style={styles.label}>Cardholder Name</Text>
        <TextInput
          style={styles.input}
          value={holderName}
          onChangeText={setHolderName}
        />

        <View style={styles.rowInputs}>
          <View style={{ flex: 1, marginRight: 6 }}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              value={expiry}
              onChangeText={setExpiry}
              placeholder="MM/YY"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
          <Text style={styles.payText}>Add my Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff", // تأكد من أن الخلفية ليست سوداء
    flexGrow: 1, // لضمان ملء كامل الشاشة
  },
  backIcon: { marginBottom: 10 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    alignSelf: "center",
  },
  cardVisual: {
    backgroundColor: "#fda4b7",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    position: "relative",
  },
  balanceLabel: { color: "#fff", fontSize: 14 },
  balance: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardNumberPreview: { color: "#fff", letterSpacing: 2, fontSize: 16 },
  expiryPreview: { color: "#fff", fontSize: 14, marginTop: 10 },
  cardLogo: {
    width: 40,
    height: 30,
    position: "absolute",
    right: 16,
    top: 16,
    resizeMode: "contain",
  },
  formSection: { backgroundColor: "#fff0f4", padding: 20, borderRadius: 20 },
  label: { fontSize: 12, color: "#333", marginBottom: 6, marginTop: 12 },
  cardInputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    flex: 1,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "#fbb6ce",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fbb6ce",
  },
  rowInputs: { flexDirection: "row", marginTop: 10 },
  payBtn: {
    backgroundColor: "#fb6090",
    padding: 14,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },
  payText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    color: "#fb6090",
    fontSize: 18,
    fontWeight: "bold",
  },
});