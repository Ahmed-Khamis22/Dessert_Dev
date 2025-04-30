import { View, Text, StyleSheet } from 'react-native';

export default function OffersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Offers & Promos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6eb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fb6090'
  }
});