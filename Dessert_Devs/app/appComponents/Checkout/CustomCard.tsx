import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomCardProps {
  title: string;
  detail: string;
  estimate?: string;
  image: any;
  selected?: boolean;
  onPress?: () => void;
  showEdit?: boolean;
  highlighted?: boolean;
  locationDetail?: string;
  onLocationDetailPress?: () => void;
  onEstimateChangePress?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  detail,
  estimate,
  image,
  selected,
  onPress,
  showEdit = false,
  highlighted = false,
  locationDetail,
  onLocationDetailPress,
  onEstimateChangePress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.card, selected && styles.selectedCard]}
    >
      <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
        <Ionicons
          name={selected ? 'checkbox' : 'square-outline'}
          size={20}
          color="#fb6090"
        />
      </TouchableOpacity>

      {showEdit && (
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="create-outline" size={18} color="#fb6090" />
        </TouchableOpacity>
      )}

      <View style={styles.innerContent}>
        <Image source={image} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.detail}>{detail}</Text>

          {locationDetail && (
            <TouchableOpacity onPress={onLocationDetailPress}>
              <Text style={styles.locationDetail}>{locationDetail}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {highlighted && estimate && (
        <>
          <View style={styles.separator} />
          <View style={styles.estimateRow}>
            <Text style={styles.estimate}>
              <Ionicons name="time-outline" size={14} color="#555" /> Estimated Delivery :{' '}
              <Text style={{ color: '#fb6090' }}>{estimate}</Text>
            </Text>
            <TouchableOpacity onPress={onEstimateChangePress}>
              <Text style={styles.change}>Change</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    position: 'relative',
  },
  selectedCard: {
    backgroundColor: '#fff0f4',
    borderColor: '#fb6090',
    borderWidth: 2,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 2,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 40,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 2,
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: '#777',
  },
  locationDetail: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#fb6090',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 10,
    marginBottom: 8,
  },
  estimateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  estimate: {
    fontSize: 12,
    color: '#555',
    flexShrink: 1,
  },
  change: {
    fontSize: 12,
    color: '#fb6090',
    fontWeight: '500',
  },
});
