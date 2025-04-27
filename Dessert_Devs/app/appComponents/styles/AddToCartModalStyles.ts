import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(130, 29, 48, 0.85)', // #821d30 + overlay effect
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 60,
  },

  checkmarkWrapper: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkmarkGlowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fb6090',
    opacity: 0.3, // أخف درجة
  },
  
  checkmarkOuter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fb6090',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkmarkIcon: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'normal',
    bottom: 3,
  },

  sparkleWrapper: {
    position: 'absolute',
    top: -10,
    right: -8,
    zIndex: 2,
  },

  sparkleWhite: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fb6090',
    backgroundColor: '#fff',
    top: 8,
    right: -26,
  },

  sparklePink: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fb6090',
    position: 'absolute',
    top: 0,
    right: -35,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'Black',
    marginBottom: 5,
    fontStyle: 'italic',
    marginTop: -20,
  },

  messageBlock: {
    alignItems: 'center',
  },
  
  message: {
    fontSize: 12,
    color: '#3d3d3d',
    textAlign: 'center',
    marginVertical: 2,
  },
  
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3d3d3d',
    textAlign: 'center',
    marginVertical: 2,
    marginBottom:5,
    marginTop:5,
  },
  
  goToCart: {
    backgroundColor: '#fb6090',
    paddingVertical: 10,
    paddingHorizontal: 75, // زوّد العرض
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#fb6090',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  
  goToCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  goToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  continueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  
  continueShopping: {
    fontSize: 15,
    color: '#3d3d3d',
    fontWeight: '500',
  },
  
  arrow: {
    color: '#fb6090',
    fontSize: 30,
    marginLeft: 4,
    bottom: 2,
  },

  closeButton: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  closeIcon: {
    fontSize: 18,
    fontWeight:'bold',
    color: '#3d3d3d',
  },
});
