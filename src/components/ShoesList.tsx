import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CardComponent from './ShoesCard';
import TextComponent from './TextComponent';
import {appInfo} from '../constants/appInfos';
import {Shoes} from '../models/ShoesModel';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';
import RowComponent from './RowComponent';
import {Add, Heart} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: Shoes;
  type: 'card' | 'list';
}

const ShoesList = (props: Props) => {
  const {item, type} = props;

  // State để lưu trữ màu sắc đã chọn
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
    <CardComponent
      onPress={() => navigation.navigate('ProductDetail', {item})}
      styles={{width: appInfo.sizes.WIDTH * 0.4}}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: item.colors[selectedColorIndex].colorImage}}>
        <RowComponent justify="flex-end">
          <TouchableOpacity>
            <Heart size={24} color={appColors.gray} />
          </TouchableOpacity>
        </RowComponent>
      </ImageBackground>

      <TextComponent
        text={item.label}
        color={appColors.primary}
        styles={{textTransform: 'uppercase'}}
        size={12}
      />

      <TextComponent
        numOfLine={1}
        text={item.name}
        font={fontFamilies.medium}
        size={16}
        styles={{marginVertical: 6, marginBottom: 12}}
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
        <TextComponent
          text={formatPrice(item.price)}
          font={fontFamilies.medium}
        />
      )}

      <RowComponent justify="space-between">
        {/* Bảng màu sắc với ScrollView */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.colorScrollView}
          contentContainerStyle={{alignItems: 'center'}}
          nestedScrollEnabled>
          {item.colors.map((color, index) => (
            <TouchableOpacity
              key={color.colorId}
              onPress={() => setSelectedColorIndex(index)}
              style={[
                styles.colorCircle,
                {
                  backgroundColor: color.colorCode,
                  borderColor:
                    selectedColorIndex === index ? appColors.primary : '#ccc',
                },
              ]}
            />
          ))}
        </ScrollView>

        {/* Nút thêm vào giỏ hàng */}
        <TouchableOpacity style={styles.addButton}>
          <Add size={24} color={appColors.white} />
        </TouchableOpacity>
      </RowComponent>
    </CardComponent>
  );
};

export default ShoesList;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    marginBottom: 12,
    height: 130,
    padding: 10,
  },
  colorScrollView: {
    maxWidth: appInfo.sizes.WIDTH * 0.25,
    height: 30,
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  addButton: {
    backgroundColor: appColors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
