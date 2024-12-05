import React, {useState} from 'react';
import {appColors} from '../constants/appColor';
import TextComponent from './TextComponent';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RowComponent from './RowComponent';
import {fontFamilies} from '../constants/fontFamilies';

interface SizeSelectorProps {
  sizes: string[];
  onSizeSelected: (size: string) => void;
}

const SizeSelector = ({sizes, onSizeSelected}: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizePress = (size: string) => {
    setSelectedSize(size);
    onSizeSelected(size);
  };

  return (
    <View style={styles.container}>
      <RowComponent>
        <TextComponent text="Size" styles={styles.sizeLabel} />
      </RowComponent>

      <FlatList
        data={sizes}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sizeList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSizePress(item)}
            style={[
              styles.sizeOption,
              selectedSize === item && styles.selectedSizeOption,
            ]}>
            <Text
              style={[
                styles.sizeText,
                selectedSize === item && styles.selectedSizeText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SizeSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    //alignItems: 'center',
  },
  sizeLabel: {
    fontSize: 16,
    fontFamily: fontFamilies.bold,
    color: appColors.text,
    marginBottom: 10,
  },
  regionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  regionText: {
    fontSize: 14,
    color: appColors.gray,
    marginHorizontal: 8,
  },
  activeRegion: {
    color: appColors.text, // Màu đậm hơn cho region được chọn
  },
  sizeList: {
    paddingRight: 10,
    paddingBottom: 16,
  },
  sizeOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: appColors.whiteLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  selectedSizeOption: {
    backgroundColor: appColors.primary,
    shadowColor: 'rgba(0, 105, 210, 1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 8,
  },
  sizeText: {
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    color: appColors.gray,
  },
  selectedSizeText: {
    color: '#fff',
  },
});
