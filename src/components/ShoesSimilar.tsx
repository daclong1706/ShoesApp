import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {appColors} from '../constants/appColor';
import {appInfo} from '../constants/appInfos';
import {fontFamilies} from '../constants/fontFamilies';
import {Shoes} from '../models/ShoesModel';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
interface Props {
  item: Shoes;
}

const ShoesSimilar = (props: Props) => {
  const {item} = props;
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Định dạng giá tiền
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  // Lấy discount dựa trên màu sắc đã chọn
  const discount =
    item.colors[selectedColorIndex]?.discountPercentage ??
    item.discountPercentage;

  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {item})}
      style={styles.contain}>
      <ImageBackground
        style={styles.imageBackground}
        source={{
          uri: item.colors[selectedColorIndex].colorImage,
        }}
      />

      <TextComponent
        numOfLine={1}
        text={item.name}
        font={fontFamilies.medium}
        size={16}
        styles={{marginVertical: 2}}
      />

      <TextComponent
        text={item.type}
        color={appColors.primary}
        size={14}
        styles={{marginBottom: 12}}
      />

      {/* Hiển thị giá với giảm giá nếu có */}
      {discount ? (
        <View>
          <TextComponent
            text={formatPrice(item.price - (item.price * discount) / 100)}
            font={fontFamilies.medium}
          />
          <TextComponent
            text={formatPrice(item.price)}
            styles={{textDecorationLine: 'line-through', color: appColors.gray}}
          />
        </View>
      ) : (
        <View>
          <TextComponent
            text={formatPrice(item.price)}
            font={fontFamilies.medium}
          />
          <SpaceComponent height={20} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ShoesSimilar;

const styles = StyleSheet.create({
  contain: {
    width: appInfo.sizes.WIDTH * 0.5,
    backgroundColor: appColors.white,
    marginRight: 12,
    marginVertical: 6,
    marginBottom: 16,
  },
  imageBackground: {
    flex: 1,
    marginBottom: 12,
    borderRadius: appInfo.sizes.WIDTH * 0.02,
    width: appInfo.sizes.WIDTH * 0.5,
    height: appInfo.sizes.WIDTH * 0.5,
    overflow: 'hidden',
  },
});
