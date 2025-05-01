import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photo: '',
  });
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserData({
            name: user.displayName || 'No name',
            email: user.email || '',
            photo: user.photoURL || 'https://via.placeholder.com/100',
          });
        }
      });
  
      return unsubscribe;
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#fb6090', '#f06292', '#ec407a']}
        style={styles.header}
      >
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Profile</Text>
        <Pressable style={styles.menuBtn}>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </Pressable>
      </LinearGradient>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: userData.photo }} style={styles.avatar} />
      </View>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable style={styles.tabItem} onPress={() => router.push('/orders')}>
          <Ionicons name="receipt-outline" size={20} color="#fff" />
          <Text style={styles.tabLabel}>All Orders</Text>
        </Pressable>

        <Pressable style={styles.tabItem} onPress={() => router.push('/offers')}>
          <Ionicons name="pricetags-outline" size={20} color="#fff" />
          <Text style={styles.tabLabel}>Offers</Text>
        </Pressable>

        <Pressable style={styles.tabItem} onPress={() => router.push('/location')}>
          <Ionicons name="location-outline" size={20} color="#fff" />
          <Text style={styles.tabLabel}>Location</Text>
        </Pressable>
      </View>

      {/* Sections */}
      <View style={styles.section}>
        <Pressable onPress={() => router.push('/editProfile')}>
          <Text style={styles.sectionItem}>Manage Profile</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/paymentMethods')}>
          <Text style={styles.sectionItem}>Payment Methods</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/myVouchers')}>
          <Text style={styles.sectionItem}>My Vouchers</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Pressable onPress={() => router.push('/language')}>
          <Text style={styles.sectionItem}>Language</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/notifications')}>
          <Text style={styles.sectionItem}>Notifications</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/settings')}>
          <Text style={styles.sectionItem}>Settings</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/support')}>
          <Text style={styles.sectionItem}>Support</Text>
        </Pressable>
      </View>

      {/* Logout */}
      <Pressable
        style={styles.logoutBtn}
        onPress={() => {
          signOut(auth)
            .then(() => {
              router.replace('/login');
            })
            .catch((error) => {
              console.log('Logout Error:', error);
            });
        }}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <View style={styles.avatarGlowWrapper}>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffe6eb' },
  header: {
    height: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginTop: 80,
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fb6090', // لون وردي ناعم
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fb6090',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 10, // مسافة بين الصورة والاسم
    marginTop:10,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  backBtn: {
    zIndex: 1
  },
  menuBtn: {
    zIndex: 1
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: -60,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  email: { color: '#555' },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  tabItem: {
    flex: 1,
    backgroundColor: '#b03060', // وردي ناعم
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#fb6090',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '600',
  },
  
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15
  },
  sectionItem: {
    paddingVertical: 10,
    fontSize: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  avatarGlowWrapper:{
    padding: 0 ,
  },
  logoutBtn: {
    marginHorizontal: 20,
    marginTop: 30, // زودنا بدل 20
    marginBottom: 30, // نزودها كمان عشان آخر الصفحة يبقى فيه راحة
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#fb6090',
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: 'bold' },

  
});