import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ href: null }} /> {/* Hide splash tab */}
      <Tabs.Screen name="products" options={{ title: 'Products' }} />
    </Tabs>
  );
}
