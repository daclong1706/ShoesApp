import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {appColors} from '../constants/appColor';
import {appInfo} from '../constants/appInfos';
import {fontFamilies} from '../constants/fontFamilies';
import {Shoes} from '../models/ShoesModel';
import {useAppDispatch, useAppSelector} from '../stores/hook';
import {
  addFavoriteItem,
  favoriteSelectorID,
  removeFavoriteItem,
} from '../stores/reducers/favoriteSlice';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
interface Props {
  item: Shoes;
  type: 'card' | 'list';
}

const ShoesSimilar = (props: Props) => {
  const {item, type} = props;

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(favoriteSelectorID);

  // State
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Định dạng giá tiền
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  // Lấy discount dựa trên màu sắc đã chọn
  const discount =
    item.colors[selectedColorIndex]?.discountPercentage ??
    item.discountPercentage;

  const totalStars = Array.isArray(item.reviews)
    ? item.reviews.reduce(
        (acc, review) => acc + parseInt(review.rating.toString()),
        0,
      )
    : 0;
  const totalReviews = Array.isArray(item.reviews) ? item.reviews.length : 0;
  const averageStars =
    totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : '0';

  const navigation: any = useNavigation();

  // Kiểm tra trạng thái yêu thích của sản phẩm

  useEffect(() => {
    const isFavorited = favorites.includes(item.productId);
    setIsFavorite(isFavorited);
  }, [favorites, item.productId]);

  const handleAddToFavorite = () => {
    // Đảo trạng thái yêu thích
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    if (newFavoriteStatus) {
      dispatch(addFavoriteItem(item.productId));
      Toast.show({
        type: 'success',
        text1: 'Đã thêm vào yêu thích',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } else {
      dispatch(removeFavoriteItem(item.productId));
      Toast.show({
        type: 'info',
        text1: 'Đã xóa khỏi yêu thích',
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

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
    borderRadius: appInfo.sizes.WIDTH * 0.02, // Half of the width/height to make it circular
    width: appInfo.sizes.WIDTH * 0.5,
    height: appInfo.sizes.WIDTH * 0.5,
    overflow: 'hidden', // Ensures the image stays within the rounded boundary
  },
});
