import { View, Text, StyleSheet } from 'react-native';

export default function ManageProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Support</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffe6eb' },
  text: { fontSize: 22, fontWeight: 'bold', color: '#fb6090' }
});