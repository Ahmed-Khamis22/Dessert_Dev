import { View, Text, StyleSheet,Pressable, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { productsData } from '../Data/productsData';

export default function Offers() {
      const router = useRouter();

  return (
    <View style={styles.container}>
  <LinearGradient
        colors={['#fb6090', '#f06292', '#ec407a']}
        style={styles.header}
      >
        <Pressable style={styles.backBtn} onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Offers</Text>

        </LinearGradient>


      <ScrollView>
  {productsData
    .filter(item => item.tag?.includes('OFF'))
    .map((item) => (
      <TouchableOpacity 
      onPress={()=>{router.replace('')}} 
      style={styles.productContainer}
       key={item.id}>
 
        <View style={styles.imageWrapper}>
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <View style={styles.offerSticker}>
              <Text style={styles.offerText}>{item.tag}</Text>
            </View>
        </View>


        <View style={styles.productsInfo}>
          <Text style={styles.productName}>{item.name}</Text>

          <Text style={styles.productPrice}>
            {item.tag && !isNaN(parseInt(item.tag)) ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.originalPrice, { fontSize: 14 }]}>
                ${((Number(item.price) * 100) / (100 - parseInt(item.tag))).toFixed(2)}
                </Text>
                {' '} ${item.price}
              </View>
      ) : (
        ' '
      )}
    </Text>
        </View>
      </TouchableOpacity>
  ))}
</ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6eb'
  },


  header:{
    height: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
    width:'100%',
  },
  backBtn:{
    zIndex: 1

  },
  title:{
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',

  },

  productContainer: {
    backgroundColor: 'white',
    marginBottom: 15,
    marginTop: 10,
    padding: 10,
    width: '100%',
    height:120,
    alignSelf:'center',
    borderRadius:10,
    display:'flex',
    flexDirection:'row',
},

productsInfo:{
    display:'flex',
    flexDirection:'column',
},

productImage: {
    height: '100%',
    marginBottom: 10,
    borderWidth:1,
    borderRadius:'10%',
    borderColor:'#fb6090',
},

productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'rgb(216 27 96)',
    marginBottom: 5,
    marginLeft:5,
},

productPrice: {
    fontSize: 15,
    fontWeight:'bold',
    color: 'rgb(109 76 65)',
    marginLeft:5,
},
productDiscount: {
    fontSize: 13,
    color: 'red',
    marginLeft:5,
},

imageWrapper: {
  width: '20%',
  height: '100%',
  marginBottom: 10,
  borderWidth:1,
  borderRadius:'10%',
  borderColor:'#fb6090',
},

offerSticker: {
  position: 'absolute',
  top: 3,
  left: 5,
  backgroundColor: '#e91e63',
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 4,
},

offerText: {
  color: 'white',
  fontSize: 11,
  fontWeight: 'bold',
},

originalPrice: {
  textDecorationLine: 'line-through',
  color: 'gray',
  fontSize: 12,
  marginRight: 5,
},



});