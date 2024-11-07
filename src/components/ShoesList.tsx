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
  loadFavorites,
  removeFavoriteItem,
} from '../stores/reducers/favoriteSlice';
import {useAppDispatch, useAppSelector} from '../stores/hook';
import Toast from 'react-native-toast-message';
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

  // Định dạng giá tiền
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  // Lấy discount dựa trên màu sắc đã chọn
  const discount =
    item.colors[selectedColorIndex]?.discountPercentage ??
    item.discountPercentage;

  const navigation: any = useNavigation();

  // Kiểm tra trạng thái yêu thích của sản phẩm
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

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

  return type === 'card' ? (
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
  ) : (
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
