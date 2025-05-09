import { View, Text, StyleSheet,Pressable, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';




export default function supportPage() {
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
        <Text style={styles.title}>Support</Text>
      
        </LinearGradient>

        <View style={styles.body}>
        <View style={styles.nav}>
              <Text style={styles.text}>Contact Us</Text>
        </View>

    <View style={styles.inner}>
      
  <View style={styles.btn}>
  <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/+201113475965')}>
    <Ionicons style={styles.icon}name="logo-whatsapp" size={24} color="#fb6090" />
    <Text style={styles.textBody}>WhatsApp</Text>
  </TouchableOpacity>
  </View>

    <View style={styles.btn}>
    <TouchableOpacity onPress={() => Linking.openURL('mailto:hamadaselim61@gmail.com?subject=dessert%20dev%20support')}>
    <Ionicons style={styles.icon} name="mail" size={24} color="#fb6090" />
    <Text style={styles.textBody}>Mail</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.btn}>
    <TouchableOpacity onPress={() => Linking.openURL('tel:+201113475965')}>
    <Ionicons style={styles.icon} name="call" size={24} color="#fb6090" />
    <Text style={styles.textBody}>Mobile</Text>
  </TouchableOpacity>
    </View>
</View>



        </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  menuBtn:{  
      zIndex: 1
},
nav:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-around',
  marginTop:25,
  marginLeft:"10%",
  // paddingBottom:,
  borderBottomWidth:1,
  borderColor:'#fb6090',
  width:'80%'
},
text: {
  fontSize: 19,
  fontWeight: 'bold',
  color: '#fb6090',
  // borderBottomWidth:2,
  borderColor:'#fb6090',
  paddingBottom:20,

},

body:{
  backgroundColor:'white',
  width:'85%',
  height:'70%',
  margin:'auto',
  borderRadius:20,
  marginVertical:60,

},
inner: {
  alignItems: 'center',
  height:'100%',
  // marginTop: '20%',
},

btn: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 30,
},

textBody: {
  color: '#fb6090',
  fontSize: 20,
  marginLeft: 10,
  alignSelf: 'center',
},
icon:{
  marginRight:150,
  top:26,
},

});