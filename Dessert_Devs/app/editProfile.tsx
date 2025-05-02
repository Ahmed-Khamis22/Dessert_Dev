import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import Toast from 'react-native-toast-message';

export default function EditProfile() {
  const router = useRouter();
  const emailInputRef = useRef<TextInput>(null);

  const [name, setName] = useState('Eva Jackson');
  const [email, setEmail] = useState('eva@gmail.com');
  const [avatar, setAvatar] = useState('https://via.placeholder.com/100');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const pickFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#fb6090', '#f06292', '#ec407a']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <View style={styles.avatarWrapper}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.cameraIcon} onPress={() => setModalVisible(true)}>
          <Ionicons name="camera" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Profile Photo</Text>
            <Pressable onPress={pickFromCamera} style={styles.modalOption}>
              <Text style={styles.modalText}>Take Photo</Text>
            </Pressable>
            <Pressable onPress={pickFromGallery} style={styles.modalOption}>
              <Text style={styles.modalText}>Choose from Gallery</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)} style={styles.modalCancel}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Your name"
          returnKeyType="next"
          onSubmitEditing={() => emailInputRef.current?.focus()}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          ref={emailInputRef}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Your email"
          keyboardType="email-address"
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={async () => {
            if (!name || !email) {
              Toast.show({
                type: 'error',
                text1: 'Error: Incomplete Data',
                text2: 'Please enter both your name and email before saving.',
                position: 'top',
                visibilityTime: 3000,
              });
              return;
            }
            setLoading(true);
          
            try {
              console.log("Before updateProfile");
          
              if (!auth.currentUser) {
                Toast.show({
                  type: 'error',
                  text1: 'Not Logged In',
                  text2: 'Please log in first.',
                });
                return;
              }
              
              await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: avatar,
              });
              
          
              console.log("After updateProfile");
          
              Toast.show({
                type: 'success',
                text1: 'Profile updated!',
                text2: 'Your changes have been saved successfully.',
              });
          
              setTimeout(() => {
                router.back();
              }, 1500);
            } catch (error) {
              if (error instanceof Error) {
                console.log('CATCH ERROR:', error.message);
                Toast.show({
                  type: 'error',
                  text1: 'Update Failed',
                  text2: error.message,
                });
              } else {
                console.log('Unknown error:', error);
                Toast.show({
                  type: 'error',
                  text1: 'Update Failed',
                  text2: 'Something went wrong.',
                });
              }
            }
            
          
            setLoading(false);
          }}
          >  
          <Text style={styles.saveText}>{loading ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
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
    marginTop: 20,
    position: 'relative',
    zIndex: 2,
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
    marginBottom: 6, // مسافة بين الصورة والاسم
    marginTop:10,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fb6090',
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 4,
  },
  form: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 14,
    color: '#3d3d3d',
    marginBottom: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 25,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    color: '#333',
  },
  saveBtn: {
    backgroundColor: '#fb6090',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#333'
  },
  modalCancel: {
    paddingVertical: 12,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#fb6090',
    fontWeight: 'bold'
  }
});