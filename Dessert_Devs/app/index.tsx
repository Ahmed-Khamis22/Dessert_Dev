import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function IndexScreen() {
  const router = useRouter();

  const logoTranslateY = useRef(new Animated.Value(-200)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/(tabs)/Home');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splashScreen.jpg')} // الخلفية
        style={styles.background}
        resizeMode="cover"
      >

    <View style={styles.overlay} />

        <Animated.Image
          source={require('../assets/images/logo3.png')} // اللوجو
          style={[
            styles.logo,
            {
              transform: [{ translateY: logoTranslateY }],
              opacity: logoOpacity,
            },
          ]}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(130, 29, 48, 0.8)', // #821d30 بشفافية 60%
    zIndex: 1,
  },  
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    zIndex: 2,
  },
  
  
});