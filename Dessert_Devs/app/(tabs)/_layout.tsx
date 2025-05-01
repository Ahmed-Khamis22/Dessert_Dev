import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import AuthGuard from '../../authGuard';

export default function TabLayout() {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fcdde7',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fb6090',
            height: 55,
            position: 'absolute',
            borderTopWidth: 0,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName: any = 'home';

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'favorite':
                iconName = focused ? 'heart' : 'heart-outline';
                break;
              case 'menu':
                iconName = focused ? 'menu' : 'menu-outline';
                break;
              case 'notifications':
                iconName = focused ? 'notifications' : 'notifications-outline';
                break;
              case 'profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
            }

            return (
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: focused ? '#fff' : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 4,
                }}
              >
                <Ionicons name={iconName} size={24} color={focused ? '#fb6090' : '#fff'} />
              </View>
            );
          },
        })}
      >
        <Tabs.Screen name="Home" />
        <Tabs.Screen name="favorite" />
        <Tabs.Screen name="menu" />
        <Tabs.Screen name="notifications" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </AuthGuard>
  );
}
