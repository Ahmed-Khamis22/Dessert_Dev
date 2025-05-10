import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import FilterModal from '../appComponents/FilterModal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  calories?: number;
  category?: string;
  sugarFree?: boolean;
  hasEgg?: boolean;
  sugarLevel?: number;
  type?: string;
}

const chatHtml = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      background-color: transparent;
    }
    #chatling-container {
      position: relative;
      height: 100%;
      width: 100%;
      padding: 10px 0;
      box-sizing: border-box;
    }
  </style>
  <script>
    window.chtlConfig = { 
      chatbotId: "9389989979",
      position: "bottom-right",
      marginVertical: 100,
      marginHorizontal: 100
    };
    (function() {
      var d = document, s = d.createElement('script');
      s.src = 'https://chatling.ai/js/embed.js';
      s.id = 'chtl-script';
      s.setAttribute('data-id', '9389989979');
      s.async = true;
      d.head.appendChild(s);
    })();
  </script>
</head>
<body>
  <div id="chatling-container"></div>
</body>
</html>`;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [cartItemsCount] = useState(1);
  const router = useRouter();
  const [filterVisible, setFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sugarFreeOnly, setSugarFreeOnly] = useState(false);
  const [sugarLevel, setSugarLevel] = useState(100);
  const [selectedOption, setSelectedOption] = useState<'withEgg' | 'eggless' | ''>('');
  const [selectedCakeTypes, setSelectedCakeTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 20]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [chatVisible, setChatVisible] = useState(false);
  const [dealImages] = useState([
    require('../../Data/images/The deal of the day image.png'),
    require('../../Data/images/choco truffle cake.jpg'),
    require('../../Data/images/red_velvet_sandwich_cake.jpg'),
    require('../../Data/images/8201-strawberry-shortcake.jpg'),
  ]);
  const addNotification = async (type: string, title: string, message: string) => {
  try {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
    
    const newNotification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};
const  unreadCount  =0;

// مثال للاستخدام عند إضافة منتج للسلة
const handleAddToCart = (product: Product) => {
  addNotification('cart', 'Item added to cart', `You added ${product.name} to your cart`);
  // ... باقي كود إضافة للسلة
};
  const [userData, setUserData] = useState({
    name: 'User',
    email: '',
    photo: 'https://example.com/default-avatar.png'
  });
  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserData({
          name: parsedData.userName || 'User',
          email: parsedData.email || '',
          photo: parsedData.photoURL || 'https://example.com/default-avatar.png'
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productData'));
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
      productsData.push({ ...doc.data(), id: doc.id } as Product);
      });
      setProducts(productsData);
      setFilteredProducts(productsData);
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(productsData.map(product => product.category || '').filter(Boolean))
      );
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search and filters
  useEffect(() => {
    let filtered = products.filter(item => {
      const matchesSearch =
  (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  (item.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  (item.category || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters = (
        (!selectedOption || 
          (selectedOption === 'withEgg' && item.hasEgg) || 
          (selectedOption === 'eggless' && !item.hasEgg)) &&
        (!sugarFreeOnly || item.sugarFree) &&
        (item.sugarLevel || 0) <= sugarLevel &&
        (selectedRating === 0 || (item.rating || 0) >= selectedRating) &&
        (selectedCakeTypes.length === 0 || (item.type && selectedCakeTypes.includes(item.type))) &&
        item.price >= priceRange[0] && item.price <= priceRange[1]
      );
      
      return matchesSearch && matchesFilters;
    });
    
    setFilteredProducts(filtered);
  }, [searchQuery, products, selectedOption, sugarFreeOnly, sugarLevel, selectedRating, selectedCakeTypes, priceRange]);

  const popularProducts = products.filter(product => (product.rating || 0) >= 4.5).slice(0, 4);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fb6090" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
  <View style={styles.headerTop}>
  <Image 
    source={{ uri: userData.photo }} 
    style={styles.userAvatar}
  />
  <View style={styles.headerIconsContainer}>
    <TouchableOpacity 
      style={styles.cartIcon}
      onPress={() => router.push('/cart')}
    >
      <Ionicons name="cart-outline" size={24} color="#666" />
      {cartItemsCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartItemsCount}</Text>
        </View>
      )}
    </TouchableOpacity>
    
<TouchableOpacity 
  style={styles.notificationIcon}
  onPress={() => router.push('/notifications')}
>
  <Ionicons name="notifications-outline" size={24} color="#666" />
  {unreadCount > 0 && (
    <View style={styles.notificationBadge}>
      <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
    </View>
  )}
</TouchableOpacity>
  </View>
</View>
<Text style={styles.greeting}>Hi {userData.name.split(' ')[0]}!</Text>
        <View style={styles.addressContainer}>
          <Ionicons name="mail-outline" size={16} color="#666" />
          <Text style={styles.emailText}>{userData.email}</Text>
        </View>
      </View>


        {/* Search Bar */}
         <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#fb6090" style={styles.searchIcon} />
          <TouchableOpacity
            style={styles.searchInput}
            onPress={() =>
              router.push({
                pathname: "/SearchResultsScreen",
                params: {
                  data: JSON.stringify(products),
                },
              })
            }
          >
            <Text style={{ color: "#fb6090", fontSize: 16, flex: 1 }}>
              {searchQuery === "" ? "Search for a dessert" : searchQuery}
            </Text>
          </TouchableOpacity>
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Ionicons name="options" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
        
        {searchQuery.trim() !== '' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <FlatList
              data={filteredProducts}
              scrollEnabled={false}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.productCard}
                  onPress={() => router.push(`/productDetails/${item.id}`)}
                >
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating?.toFixed(1) || '4.5'}</Text>
                  </View>
                  
                  <Image 
                    source={{ uri: item.images[0] }} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDescription}>{item.description}</Text>
                  
                  {item.calories && (
                    <View style={styles.caloriesContainer}>
                      <Ionicons name="flame" size={12} color="#FF5722" />
                      <Text style={styles.caloriesText}>{item.calories} Calories</Text>
                    </View>
                  )}
                  
                  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No products found matching "{searchQuery}"</Text>
                </View>
              }
            />
          </View>
        ) : (
          <>
            {/* Deal of the Day Section */}
            <View style={styles.section}>
              <View style={styles.dealHeader}>
                <Text style={styles.sectionTitle}>DEAL OF THE DAY</Text>
                <TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View style={styles.dealScrollContainer}>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={(event) => {
                    const contentOffset = event.nativeEvent.contentOffset.x;
                    const index = Math.round(contentOffset / (Dimensions.get('window').width - 32));
                    setCurrentDealIndex(index);
                  }}
                  scrollEventThrottle={16}
                >
                  {dealImages.map((deal) => (
        <View key={deal.id} style={styles.dealImageContainer}>
          <Image 
            source={deal.image} 
            style={styles.dealImage}
            resizeMode="cover"
          />
          <View style={styles.dealBadge}>
            <Text style={styles.dealBadgeText}>DEAL</Text>
          </View>
          <Text style={styles.dealTitle}>{deal.title}</Text>
          <Text style={styles.dealPrice}>{deal.price}</Text>
        </View>
                  ))}
                </ScrollView>
              </View>

              {/* Pagination Dots */}
              <View style={styles.pagination}>
                {dealImages.map((_, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.dot,
                      index === currentDealIndex ? styles.activeDot : {}
                    ]} 
                  />
                ))}
              </View>
            </View>

            {/* Categories */}
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Categories</Text>
              </View>
              <FlatList
                horizontal
                data={categories}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.categoryItem,
                      {
                        marginRight: item === categories[categories.length - 1] ? 0 : 10,
                        backgroundColor: hoveredCategory === item ? '#fb6090' : 'transparent',
                        borderWidth: 1,
                        borderColor: '#fb6090',
                      },
                    ]}
                    onPress={() => {
                      setSelectedCategory(item === selectedCategory ? null : item);
                      setSearchQuery(item === selectedCategory ? '' : item);
                    }}
                    {...(Platform.OS === 'web'
                      ? {
                          onMouseEnter: () => setHoveredCategory(item),
                          onMouseLeave: () => setHoveredCategory(null),
                        }
                      : {
                          onPressIn: () => setHoveredCategory(item),
                          onPressOut: () => setHoveredCategory(null),
                        })}
                  >
                    <FontAwesome
                      name={
                        item === 'Birthday'
                          ? 'gift'
                          : item === 'Anniversary'
                          ? 'heart'
                          : item === 'Wedding'
                          ? 'diamond'
                          : item === 'Specialty'
                          ? 'star'
                          : item === 'Celebration'
                          ? 'birthday-cake'
                          : 'sun-o'
                      }
                      size={20}
                      color={hoveredCategory === item ? '#fff' : '#fb6090'}
                    />
                    <Text
                      style={[
                        styles.categoryText,
                        { color: hoveredCategory === item ? '#fff' : '#fb6090' },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={[styles.categoriesContainer, { paddingRight: 15 }]}
              />
            </View>

           
           {/* Popular Products */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
               Popular Cakes
              </Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all &gt;</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={popularProducts}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.productCard}
                  onPress={() => router.push(`/productDetails?id=${item.id}`)}
                >
                  <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <FontAwesome 
                      name={favorites.includes(item.id) ? "heart" : "heart-o"} 
                      size={20} 
                      color={favorites.includes(item.id) ? "#fb6090" : "#ccc"} 
                    />
                  </TouchableOpacity>

                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating?.toFixed(1) || '4.5'}</Text>
                  </View>

                  <Image 
                    source={{ uri: item.images[0] }} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />

                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDescription}>{item.description}</Text>
                  
                  {item.calories && (
                    <View style={styles.caloriesContainer}>
                      <Ionicons name="flame" size={12} color="#FF5722" />
                      <Text style={styles.caloriesText}>{item.calories} Calories</Text>
                    </View>
                  )}

                  <View style={styles.priceAddContainer}>
                    <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.popularContainer}
            />
          </View>

            {/* Special Offers */}
          
          </>
        )}
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
      </ScrollView>
      
      {/* Chat Bot Button */}
      <TouchableOpacity 
        style={styles.chatButton}
        onPress={() => setChatVisible(true)}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Chat Modal */}
      {chatVisible && (
        <View style={styles.chatModal}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Customer Support</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setChatVisible(false)}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <WebView
            source={{ html: chatHtml, baseUrl: 'https://chatling.ai' }}
            style={styles.chatWebview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
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
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: -3,
    top: -3,
    backgroundColor: '#fb6090',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#fb6090',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fb6090',
    fontWeight: '600',
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#fb6090',
    padding: 10,
    borderRadius: 12,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
    marginLeft: 5,
  },
  viewAll: {
    fontSize: 14,
    color: '#fb6090',
  },
  categoriesContainer: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  categoryItem: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: 100,
  },
  categoryText: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  popularContainer: {
    paddingLeft: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fb6090',
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 3,
    fontWeight: 'bold',
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  caloriesText: {
    fontSize: 12,
    color: '#FF5722',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 5,
  },
  priceAddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#fb6090',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  offerCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  offerCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  offerCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fb6090',
    marginRight: 5,
  },
  offerValid: {
    fontSize: 12,
    color: '#999',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dealScrollContainer: {
    height: 200,
  },
  dealImageContainer: {
    width: Dimensions.get('window').width - 40,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dealBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fb6090',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  dealBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dealTitle: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  dealPrice: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fb6090',
  },
  chatButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fb6090',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatModal: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1001,
  },
  chatHeader: {
    height: 60,
    backgroundColor: '#fb6090',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  chatTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatWebview: {
    flex: 1,
    marginTop: 1,
    marginBottom: 100,
    backgroundColor: 'transparent',
  },
});