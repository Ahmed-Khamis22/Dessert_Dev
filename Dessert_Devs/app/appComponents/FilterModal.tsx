// FilterModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from '@react-native-community/slider';
import styles from './styles/filterModalStyles';

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  sugarFreeOnly: boolean;
  setSugarFreeOnly: (val: boolean) => void;
  sugarLevel: number;
  setSugarLevel: (val: number) => void;
  priceRange: [number, number];
  setPriceRange: (val: [number, number]) => void;
  selectedOption: 'withEgg' | 'eggless' | '';
  setSelectedOption: (val: 'withEgg' | 'eggless' | '') => void;
  selectedRating: number;
  setSelectedRating: (val: number) => void;
  selectedCakeTypes: string[];
  setSelectedCakeTypes: (val: string[]) => void;
};

const cakeOptions = ['Chocolate Cake', 'Pastry', 'Cookie', 'Strawberry Cake', 'Middle Eastern', 'Italian'];

export default function FilterModal({
  visible,
  onClose,
  onApply,
  sugarFreeOnly,
  setSugarFreeOnly,
  sugarLevel,
  setSugarLevel,
  priceRange,
  setPriceRange,
  selectedOption,
  setSelectedOption,
  selectedRating,
  setSelectedRating,
  selectedCakeTypes,
  setSelectedCakeTypes,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Your Search</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalSubtitle}>Select Your Choice</Text>

          {/* Egg Options */}
          <View style={styles.radioGroup}>
            {['withEgg', 'eggless'].map(option => (
              <TouchableOpacity
                key={option}
                style={[styles.radioOption, selectedOption === option && styles.radioOptionSelected]}
                onPress={() => setSelectedOption(selectedOption === option ? '' : option as any)}
              >
                <View style={styles.radioCircle}>
                  {selectedOption === option && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.radioLabel}>{option === 'withEgg' ? 'With Egg' : 'Eggless'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Cake Type */}
          <Text style={styles.sectionTitle}>Cake Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.optionGroupHorizontal}>
              {cakeOptions.map(cake => (
                <TouchableOpacity
                  key={cake}
                  style={[styles.chip, selectedCakeTypes.includes(cake) && styles.chipSelected]}
                  onPress={() => {
                    if (selectedCakeTypes.includes(cake)) {
                      setSelectedCakeTypes(selectedCakeTypes.filter(t => t !== cake));
                    } else {
                      setSelectedCakeTypes([...selectedCakeTypes, cake]);
                    }
                  }}
                >
                  <Text style={[styles.chipText, selectedCakeTypes.includes(cake) && styles.chipTextSelected]}>
                    {cake}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Sugar + Sugar-Free */}
          <View style={styles.labelRow}>
            <Text style={styles.modalLabel}>Choose Sugar Level</Text>
            <View style={styles.sugarFreeRow}>
              <Text style={styles.switchLabel}>Sugar-Free</Text>
                <TouchableOpacity
                    onPress={() => setSugarFreeOnly(!sugarFreeOnly)}
                    style={styles.checkboxContainer}
                    >
                    <View style={[styles.checkbox, sugarFreeOnly && styles.checkboxChecked]}>
                        {sugarFreeOnly && (
                        <Text style={styles.checkmark}>✔</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sliderWrapper}>
          <View
            style={[
                styles.sliderValueBubble,
                {
                left: `${sugarLevel}%`,
                transform: [
                    {
                    translateX:
                        sugarLevel === 0 ? 10 : sugarLevel === 100 ? -35 : -20,
                    },
                ],
                },
            ]}
            >
            <Text style={styles.sliderValueText}>{sugarLevel}%</Text>
            </View>

            <Slider
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={sugarLevel}
              onValueChange={setSugarLevel}
              minimumTrackTintColor="#fb6090"
              maximumTrackTintColor="#eee"
              thumbTintColor="#fb6090"
              style={styles.slider}
            />
          </View>

          <View style={styles.sliderLabels}>
            <Text><Text style={styles.sliderLabelBold}>0%</Text><Text style={styles.sliderLabelText}> Low Sugar</Text></Text>
            <Text><Text style={styles.sliderLabelBold}>50%</Text><Text style={styles.sliderLabelText}> Medium</Text></Text>
            <Text><Text style={styles.sliderLabelBold}>100%</Text><Text style={styles.sliderLabelText}> High Sugar</Text></Text>
          </View>

          {/* Price */}
          <Text style={styles.sectionTitle}>Pricing Range</Text>
          <View style={styles.pricingRangeLabels}>
            <Text style={styles.priceBox}>${priceRange[0]}</Text>
            <Text style={styles.priceBox}>${priceRange[1]}</Text>
          </View>
          <View style={styles.sliderContainer}>
            <MultiSlider
              values={priceRange}
              onValuesChange={(values) => setPriceRange([values[0], values[1]])}
              min={1}
              max={20}
              step={1}
              allowOverlap={false}
              snapped
              selectedStyle={{ backgroundColor: '#fb6090' }}
              unselectedStyle={{ backgroundColor: '#e0e0e0' }}
              trackStyle={{ height: 6 }}
              markerStyle={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: '#fb6090',
              }}
            />
          </View>

          {/* Rating */}
          <Text style={styles.sectionTitle}>Rating</Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map(num => (
              <TouchableOpacity
                key={num}
                style={[styles.ratingCircle, selectedRating === num && styles.ratingCircleSelected]}
                onPress={() => setSelectedRating(selectedRating === num ? 0 : num)}
              >
                <Text style={[styles.ratingText, selectedRating === num && styles.ratingTextSelected]}>
                  ⭐ {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Apply Button */}
          <Pressable style={styles.applyButton} onPress={onApply}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}
