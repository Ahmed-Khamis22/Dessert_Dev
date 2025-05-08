import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import CustomCard from './appComponents/Checkout/CustomCard';
import CheckoutScreenWrapper from './appComponents/Checkout/CheckoutScreenWrapper';

const pickupLocations = [
  {
    id: '1',
    title: 'Deliver to : Home',
    detail: 'Zamalek, Cairo',
    locationDetail: 'Apartment 3B, Floor 4',
    estimate: '22 Nov, 2021 / 11:30 AM',
    image: require('../assets/images/map.jpg'),
    coords: { lat: 30.0508, lon: 31.2336 },
  },
  {
    id: '2',
    title: 'Office',
    detail: 'Nasr City, Cairo',
    locationDetail: '5th Floor, Room 502',
    estimate: '',
    image: require('../assets/images/office.jpg'),
    coords: { lat: 30.0561, lon: 31.3300 },
  },
  {
    id: '3',
    title: 'On the go',
    detail: 'Drive-thru, Maadi',
    locationDetail: 'Next to Fuel Station',
    estimate: '',
    image: require('../assets/images/on_the_go.jpg'),
    coords: { lat: 29.9626, lon: 31.2591 },
  },
];

export default function PickupOptionsScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(pickupLocations[0].id);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userLat = location.coords.latitude;
      const userLon = location.coords.longitude;

      const closest = getClosestBranch(userLat, userLon);
      setSelectedId(closest.id);
    })();
  }, []);

  const getClosestBranch = (userLat: number, userLon: number) => {
    let minDistance = Infinity;
    let closestBranch = pickupLocations[0];

    pickupLocations.forEach((branch) => {
      const { lat, lon } = branch.coords;
      const distance = Math.sqrt(
        Math.pow(userLat - lat, 2) + Math.pow(userLon - lon, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestBranch = branch;
      }
    });

    return closestBranch;
  };

  const handleLocationDetailPress = (id: string) => {
    console.log('Pressed location detail for:', id);
    // Placeholder for future modal
  };

  const renderItem = ({ item, index }: { item: typeof pickupLocations[0]; index: number }) => {
    const isSelected = item.id === selectedId;

    if (index === 1) {
      return (
        <>
          <View style={styles.separatorContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.line} />
          </View>
          <Text style={styles.subText}>Choose another Location</Text>

          <CustomCard
            title={item.title}
            detail={item.detail}
            locationDetail={item.locationDetail}
            estimate={item.estimate}
            image={item.image}
            selected={isSelected}
            onPress={() => setSelectedId(item.id)}
            onLocationDetailPress={() => handleLocationDetailPress(item.id)}
            showEdit
          />
        </>
      );
    }

    return (
      <CustomCard
        title={item.title}
        detail={item.detail}
        locationDetail={item.locationDetail}
        estimate={item.estimate}
        image={item.image}
        selected={isSelected}
        onPress={() => setSelectedId(item.id)}
        onLocationDetailPress={() => handleLocationDetailPress(item.id)}
        showEdit={index === 0}
        highlighted={index === 0}
      />
    );
  };

  return (
    <CheckoutScreenWrapper
      step="location"
      buttonLabel="Proceed"
      disabled={!selectedId}
      onNext={() => router.push('./OrderSummaryScreen')}
    >
      <FlatList
        data={pickupLocations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        showsVerticalScrollIndicator={false}
      />
    </CheckoutScreenWrapper>
  );
}

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 8,
    color: '#555',
    fontWeight: '600',
  },
  subText: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#888',
    fontSize: 13,
  },
});
