import {useNavigation} from '@react-navigation/native';
import {Add, Heart} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import favoriteAPI from '../apis/favoriteAPI'; // Nếu có API quản lý danh sách yêu thích
import {appColors} from '../constants/appColor';
import {appInfo} from '../constants/appInfos';
import {fontFamilies} from '../constants/fontFamilies';
import {Shoes} from '../models/ShoesModel';
import RowComponent from './RowComponent';
import ShoesCard from './ShoesCard';
import TextComponent from './TextComponent';

interface Props {
  item: Shoes;
  type: 'card' | 'list';
}

const ShoesList = (props: Props) => {
  const {item, type} = props;

  // State để lưu trữ màu sắc đã chọn
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // State để lưu trữ trạng thái yêu thích của sản phẩm
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Định dạng giá tiền
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  // Lấy discount dựa trên màu sắc đã chọn
  const discount =
    item.colors[selectedColorIndex]?.discountPercentage ??
    item.discountPercentage;

  const navigation: any = useNavigation();

  // Kiểm tra trạng thái yêu thích của sản phẩm khi component được mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const res = await favoriteAPI.getFavorite(); // Lấy dữ liệu từ API
        if (res) {
          // Kiểm tra nếu res và res.favorites tồn tại
          const isFavorited = res.data.favorites.some(
            (favorite: {productId: string}) =>
              favorite.productId === item.productId,
          );
          setIsFavorite(isFavorited);
        } else {
          console.warn('No favorites found in response:', res);
        }
        console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [item.productId]);

  const handleAddToFavorite = async () => {
    try {
      // Đảo trạng thái yêu thích
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);

      if (newFavoriteStatus) {
        // Nếu chuyển sang trạng thái yêu thích
        const res = await favoriteAPI.addFavorite(item.productId);
        console.log('Product added to favorites:', res);
      } else {
        // Nếu bỏ yêu thích
        const res = await favoriteAPI.removeFavorite(item.productId);
        console.log('Removed from favorite:', res);
      }
    } catch (error) {
      console.error('Failed to update favorite status:', error);
      // Nếu có lỗi, khôi phục trạng thái yêu thích ban đầu
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <ShoesCard
      onPress={() => navigation.navigate('ProductDetail', {item})}
      styles={{width: appInfo.sizes.WIDTH * 0.45}}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: item.colors[selectedColorIndex].colorImage}}>
        <RowComponent justify="flex-end">
          <TouchableOpacity onPress={handleAddToFavorite}>
            <Heart
              size={24}
              color={isFavorite ? appColors.primary : appColors.gray}
            />
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
    </ShoesCard>
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
