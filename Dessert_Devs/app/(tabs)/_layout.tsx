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
        <Tabs.Screen
          name="Home"
          options={{
            tabBarStyle: {
              backgroundColor: '#fb6090',
              height: 55,
              position: 'absolute',
              borderTopWidth: 0,
              paddingBottom: 8,
              paddingTop: 8,
            },
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            tabBarStyle: { display: 'none' },
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
