import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Octicons from 'react-native-vector-icons/Octicons';
import {RowComponent, SpaceComponent, TextComponent} from '../../components';
import {appColors} from '../../constants/appColor';
import {appInfo} from '../../constants/appInfos';
import {fontFamilies} from '../../constants/fontFamilies';
import {LoadingModal} from '../../modals';
import {Shoes} from '../../models/ShoesModel';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {
  addFavoriteItem,
  favoriteSelectorID,
  removeFavoriteItem,
} from '../../stores/reducers/favoriteSlice';

interface Props {
  item: Shoes;
  onFavorite: () => void;
}

const ShoesFavorite = (props: Props) => {
  const {item, onFavorite} = props;

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

  useEffect(() => {
    const isFavorited = favorites.includes(item.productId);
    setIsFavorite(isFavorited);
  }, [favorites, item.productId]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {item})}
      style={styles.contain}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: item.colors[selectedColorIndex].colorImage}}>
        <RowComponent
          justify="space-between"
          styles={{alignItems: 'flex-start', marginHorizontal: 16}}>
          <View>
            <TextComponent
              text={item.label}
              color={appColors.primary}
              font="PatrickHandSC"
              styles={{textTransform: 'uppercase'}}
              size={12}
            />

            <TextComponent
              numOfLine={1}
              text={item.name}
              font={'LaOriental'}
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
                  styles={{
                    textDecorationLine: 'line-through',
                    color: appColors.gray,
                  }}
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
          </View>
          <TouchableOpacity
            onPress={onFavorite}
            style={{
              backgroundColor: appColors.white,
              borderRadius: 18,
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
            {isFavorite ? (
              <Octicons name="heart-fill" size={18} color={appColors.primary} />
            ) : (
              <Octicons name="heart" size={18} color={appColors.primary} />
            )}
          </TouchableOpacity>
        </RowComponent>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ShoesFavorite;

const styles = StyleSheet.create({
  contain: {
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.WIDTH * 0.9,
    backgroundColor: appColors.white,

    marginVertical: 6,
    marginBottom: 16,
  },
  imageBackground: {
    flex: 1,
    marginBottom: 12,
    height: appInfo.sizes.WIDTH * 0.9,
    padding: 10,
    resizeMode: 'cover',
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
