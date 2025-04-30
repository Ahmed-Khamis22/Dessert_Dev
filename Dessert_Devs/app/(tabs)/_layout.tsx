// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthGuard from '../../authGuard'; // تأكد من الباث الصحيح
import Toast from 'react-native-toast-message';

export default function TabLayout() {
  return (
      <>
        <AuthGuard>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: '#f48fb1', // وردي نشط
              tabBarInactiveTintColor: '#ffffff', // أبيض هادي
              tabBarStyle: {
                backgroundColor: '#4e342e', // بني غامق متناسق مع الأزرار
                borderTopWidth: 0,
                height: 65,
                paddingBottom: 10,
                paddingTop: 6,
              },
              tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: '600',
              },
            }}
          >
          <Tabs.Screen 
            name="index"
            options={{
              headerShown: false,
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={28} />
              ),
            }}
          />
        
          <Tabs.Screen
            name="about"
            options={{
              headerShown: false,
              title: 'About',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={28} />
              ),
            }}  
          />
        
          <Tabs.Screen
            name="products"
            options={{
              headerShown: false,
              title: 'Products',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'cart-sharp' : 'cart-outline'} color={color} size={28} />
              ),
            }}
          />

          // For profile
          <Tabs.Screen
            name="profile"
            options={{
              headerShown: false, // عشان أشيل الجزء الأبيض اللي كان فوق في البروفايل 
              title: "Profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        
          </Tabs>
        </AuthGuard>

        <Toast/> 
      </>      
  );
}
