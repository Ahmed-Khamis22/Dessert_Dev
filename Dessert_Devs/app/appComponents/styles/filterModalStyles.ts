// filterModalStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(251, 96, 144, 0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3e2723',
  },
  closeIcon: {
    fontSize: 20,
    color: '#888',
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3e2723',
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fb6090',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  radioOptionSelected: {
    backgroundColor: '#ffeaf0',
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fb6090',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fb6090',
  },
  radioLabel: {
    color: '#444',
    fontSize: 14,
    fontWeight: '500',
  },
  optionGroupHorizontal: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#fb6090',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  chipSelected: {
    backgroundColor: '#fb6090',
    borderColor: '#fb6090',
  },
  chipText: {
    color: '#555',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6d4c41',
  },
  sugarFreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  switchLabel: {
    fontSize: 16,
    color: '#5d4037',
    fontWeight: '500',
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#fb6090',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#fff', // خلي الخلفية بيضاء لو عايز تباين
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#fb6090',
    fontSize: 16, // كبر الحجم شوية
    fontWeight: 'bold',
    lineHeight: 16,
  },
  
  


  sliderWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4, // بدل 8
    marginTop: 6,    // بدل 10
    position: 'relative',
  },
  
  sliderValueBubble: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    elevation: 2,
    zIndex: 1,
  },
  
  sliderValueText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#000',
  },
  slider: {
    width: '100%',
    height: 50,
  },
  sliderLabels: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignSelf: 'stretch',
  marginTop: -20,
  marginBottom: 14, // زودناها علشان تبعد عن الـ pricing
},

  sliderLabelBold: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  sliderLabelText: {
    fontSize: 13,
    color: '#999',
  },
  pricingRangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceBox: {
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    fontWeight: 'bold',
    color: '#6d4c41',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  ratingCircle: {
    borderWidth: 1,
    borderColor: '#fb6090',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  ratingCircleSelected: {
    backgroundColor: '#fb6090',
  },
  ratingText: {
    color: '#333',
    fontWeight: '600',
  },
  ratingTextSelected: {
    color: '#fff',
  },
  applyButton: {
    backgroundColor: '#fb6090',
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
