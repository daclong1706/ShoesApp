import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {appColors} from '../../../constants/appColor';

interface ProductLabelProps {
  imageSource: any; // Hình ảnh có thể là URL hoặc yêu cầu local image
  label: string;
  color?: string;
  width?: number;
  height?: number;
  onPress?: () => void;
}

const ProductLabel: React.FC<ProductLabelProps> = ({
  imageSource,
  label,
  color,
  width,
  height,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {backgroundColor: color}]}>
        <Text style={styles.text}>{label}</Text>
        <Image
          source={imageSource}
          style={{width: width, height: height}}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 25,
    backgroundColor: '#5476E0',
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 6,
    shadowColor: appColors.coolGray, // Màu sắc của shadow
    shadowOffset: {width: 0, height: 2}, // Vị trí của shadow
    shadowOpacity: 0.3, // Độ mờ của shadow
    shadowRadius: 4, // Độ lan tỏa của shadow

    // Shadow for Android
    elevation: 5, // Độ cao của shadow
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontFamily: 'octin sports rg',
    textTransform: 'uppercase',
  },
});

export default ProductLabel;
