import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilterModal from '../appComponents/FilterModal';
import ProductCard from '../appComponents/ProductCard';
import { productsData } from '../../Data/productsData';
import { Link , useRouter} from 'expo-router';

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sugarFreeOnly, setSugarFreeOnly] = useState(false);
  const [sugarLevel, setSugarLevel] = useState(100);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'withEgg' | 'eggless' | ''>('');
  const [selectedCakeTypes, setSelectedCakeTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 20]);
  const [selectedRating, setSelectedRating] = useState(0);

  const router = useRouter();
  const filteredProducts = productsData.filter(item => {
    const price = parseFloat(item.price.replace('$', ''));
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedOption || (selectedOption === 'withEgg' && item.hasEgg) || (selectedOption === 'eggless' && !item.hasEgg)) &&
      (!sugarFreeOnly || item.sugarFree) &&
      item.sugarLevel <= sugarLevel &&
      (selectedRating === 0 || item.rating === selectedRating) &&
      (selectedCakeTypes.length === 0 || selectedCakeTypes.includes(item.type)) &&
      price >= priceRange[0] && price <= priceRange[1]
    );
  });
  
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80' }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Our Sweet Treats</Text>

        {/* Search Bar + Filter Button */}
        <View style={styles.searchRow}>
          <TouchableOpacity
            style={styles.searchInput}
            onPress={() =>
              router.push({
                pathname: "/SearchResultsScreen",
                params: {
                  data: JSON.stringify(productsData),
                },
              })
            }
          >
            <Text style={{ color: "#999", fontSize: 16 }}>
              {searchQuery === "" ? "Search for a dessert" : searchQuery}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Ionicons name="options" size={24} color="#fff" />
          </TouchableOpacity>
        </View>


        {/* Products */}
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ProductCard {...item} />}
        />

        <View style={styles.backButton}>
          <Link href="/(tabs)/Home" style={styles.backButtonText}>
            Go Back to Home
          </Link>
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={() => setFilterVisible(false)}
        sugarFreeOnly={sugarFreeOnly}
        setSugarFreeOnly={setSugarFreeOnly}
        sugarLevel={sugarLevel}
        setSugarLevel={setSugarLevel}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedCakeTypes={selectedCakeTypes}
        setSelectedCakeTypes={setSelectedCakeTypes}
      />
    </ImageBackground>
  );
}
ProductsScreen.options = {
  tabBarStyle: { display: 'none' },
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  pageTitle: {
    fontSize: 44,
    fontFamily: 'GreatVibes',
    textAlign: 'center',
    marginBottom: 16,
    color: '#6d4c41',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#e0c3b2',
    color: '#333',
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#f48fb1',
    padding: 10,
    borderRadius: 12,
  },
  backButton: {
    marginTop: 15,
    backgroundColor: '#6d4c41',
    padding: 12,
    borderRadius: 30,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
