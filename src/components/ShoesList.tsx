import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Add, Heart} from 'iconsax-react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import favoriteAPI from '../apis/favoriteAPI';
import {appColors} from '../constants/appColor';
import {appInfo} from '../constants/appInfos';
import {fontFamilies} from '../constants/fontFamilies';
import {Shoes} from '../models/ShoesModel';
import RowComponent from './RowComponent';
import ShoesCard from './ShoesCard';
import TextComponent from './TextComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFavoriteItem,
  favoriteSelectorID,
  loadFavoriteDetails,
  loadFavorites,
  removeFavoriteItem,
} from '../stores/reducers/favoriteSlice';
import {useAppDispatch, useAppSelector} from '../stores/hook';
import Toast from 'react-native-toast-message';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SpaceComponent from './SpaceComponent';
import {LoadingModal} from '../modals';
interface Props {
  item: Shoes;
  type: 'card' | 'list';
}

const ShoesList = (props: Props) => {
  const {item, type} = props;

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(favoriteSelectorID);

  // State
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAddToFavorite = async () => {
    // Đảo trạng thái yêu thích
    const newFavoriteStatus = !isFavorite;
    setIsLoading(true);
    setIsFavorite(newFavoriteStatus);
    if (newFavoriteStatus) {
      Toast.show({
        type: 'success',
        text1: 'Đã thêm vào yêu thích',
        position: 'top',
        visibilityTime: 2000,
      });
      await dispatch(addFavoriteItem(item.productId));
    } else {
      Toast.show({
        type: 'info',
        text1: 'Đã xóa khỏi yêu thích',
        position: 'top',
        visibilityTime: 2000,
      });
      await dispatch(removeFavoriteItem(item.productId));
    }
    setIsLoading(false);
  };

  return (
    <ShoesCard
      onPress={() => navigation.navigate('ProductDetail', {item})}
      styles={{width: appInfo.sizes.WIDTH * 0.45}}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: item.colors[selectedColorIndex].colorImage}}>
        <RowComponent justify="flex-end">
          <TouchableOpacity
            onPress={handleAddToFavorite}
            style={{
              backgroundColor: appColors.white,
              borderRadius: 18,
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {isFavorite ? (
              <Octicons name="heart-fill" size={18} color={appColors.primary} />
            ) : (
              <Octicons name="heart" size={18} color={appColors.primary} />
            )}
          </TouchableOpacity>
        </RowComponent>
      </ImageBackground>

      <TextComponent
        text={item.label}
        color={appColors.primary}
        font="UnicaOne"
        styles={{textTransform: 'uppercase'}}
        size={14}
      />

      <TextComponent
        numOfLine={1}
        text={item.name}
        font={fontFamilies.semiMedium}
        size={16}
        styles={{marginVertical: 6, marginBottom: 12}}
      />

      {/* Hiển thị giá với giảm giá nếu có */}
      {discount ? (
        <View>
          <TextComponent
            text={formatPrice(item.price - (item.price * discount) / 100)}
            font={fontFamilies.semiMedium}
          />
          <TextComponent
            text={formatPrice(item.price)}
            font={fontFamilies.semiRegular}
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

      <RowComponent justify="space-between">
        {/* Bảng màu sắc với ScrollView */}
        {item.colors.length > 1 ? (
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
        ) : (
          <SpaceComponent height={30} />
        )}

        {/* Nút thêm vào giỏ hàng */}
        <RowComponent>
          <AntDesign name="star" size={16} color={appColors.primary} />
          <TextComponent
            text={averageStars}
            styles={{marginHorizontal: 6}}
            font={fontFamilies.semiMedium}
          />
        </RowComponent>
      </RowComponent>
      {/* <LoadingModal visible={isLoading} /> */}
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
