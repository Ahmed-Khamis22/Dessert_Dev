import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Notification {
  id: string;
  type: 'order' | 'profile' | 'favorite' | 'deal' | 'cart';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: any;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // تحميل الإشعارات من AsyncStorage
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          const parsedNotifications = JSON.parse(storedNotifications);
          // تحويل تاريخ النشر إلى كائن Date
          const notificationsWithDate = parsedNotifications.map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp)
          }));
          setNotifications(notificationsWithDate);
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // تحديث حالة القراءة عند فتح الإشعار
  const markAsRead = async (id: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  // حذف إشعار
  const deleteNotification = async (id: string) => {
    const updatedNotifications = notifications.filter(n => n.id !== id);
    setNotifications(updatedNotifications);
    await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  // معالجة الضغط على الإشعار
  const handleNotificationPress = (notification: Notification) => {
    markAsRead(notification.id);
    
    switch (notification.type) {
      case 'order':
        router.push('/cart');
        break;
      case 'profile':
        router.push('/profile');
        break;
      case 'favorite':
        router.push('/favorite');
        break;
      case 'deal':
        router.push('/');
        break;
      case 'cart':
        router.push('/cart');
        break;
      default:
        break;
    }
  };

  // عرض أيقونة حسب نوع الإشعار
  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Ionicons name="cart" size={24} color="#fb6090" />;
      case 'profile':
        return <Ionicons name="person" size={24} color="#4CAF50" />;
      case 'favorite':
        return <Ionicons name="heart" size={24} color="#F44336" />;
      case 'deal':
        return <Ionicons name="pricetag" size={24} color="#FF9800" />;
      case 'cart':
        return <Ionicons name="basket" size={24} color="#9C27B0" />;
      default:
        return <Ionicons name="notifications" size={24} color="#2196F3" />;
    }
  };

  // تنسيق الوقت
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading notifications...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => setNotifications([])}>
          <Text style={styles.clearAll}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image 
            source={require('../../assets/images/empty-notifications.jpg')} 
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No notifications yet</Text>
          <Text style={styles.emptySubText}>We'll notify you when something arrives</Text>
        </View>
      ) : (
        <FlatList
          data={notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.notificationCard, !item.read && styles.unreadCard]}
              onPress={() => handleNotificationPress(item)}
            >
              <View style={styles.notificationIcon}>
                {renderNotificationIcon(item.type)}
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{formatTime(item.timestamp)}</Text>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteNotification(item.id)}
              >
                <Ionicons name="close" size={20} color="#999" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clearAll: {
    color: '#fb6090',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#fb6090',
  },
  unreadCard: {
    backgroundColor: '#fef6f9',
    borderLeftWidth: 4,
    borderLeftColor: '#fb6090',
  },
  notificationIcon: {
    marginRight: 16,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 4,
    alignSelf: 'flex-start',
  },
});