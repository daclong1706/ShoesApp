import {useNavigation} from '@react-navigation/native';
import {Add, Heart, Trash} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {appInfo} from '../../constants/appInfos';
import {Shoes} from '../../models/ShoesModel';
import favoriteAPI from '../../apis/favoriteAPI';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  ShoesCard,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {favoriteSelectorID} from '../../stores/reducers/favoriteSlice';

interface Props {
  item?: Shoes;
  type?: 'card' | 'list';
}

const ShoesCart = (props: Props) => {
  const {item, type} = props;

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(favoriteSelectorID);

  // State để lưu trữ màu sắc đã chọn
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // State để lưu trữ trạng thái yêu thích của sản phẩm
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Định dạng giá tiền
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  // Lấy discount dựa trên màu sắc đã chọn
  // const discount =
  //   item.colors[selectedColorIndex]?.discountPercentage ??
  //   item.discountPercentage;

  const navigation: any = useNavigation();

  // // Kiểm tra trạng thái yêu thích của sản phẩm khi component được mount
  // useEffect(() => {
  //   const checkFavoriteStatus = async () => {
  //     try {
  //       const res = await favoriteAPI.getFavorite(); // Lấy dữ liệu từ API
  //       if (res) {
  //         const isFavorited = res.data.favorites.some(
  //           (favorite: {productId: string}) =>
  //             favorite.productId === item.productId,
  //         );
  //         setIsFavorite(isFavorited);
  //       } else {
  //         console.warn('No favorites found in response:', res);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch favorite status:', error);
  //     }
  //   };

  //   checkFavoriteStatus();
  // }, [item.productId]);

  // useEffect(() => {
  //   const isFavorited = favorites.includes(item.productId);
  //   setIsFavorite(isFavorited);
  // }, [favorites, item.productId]);

  // const handleAddToFavorite = async () => {
  //   try {
  //     // Đảo trạng thái yêu thích
  //     const newFavoriteStatus = !isFavorite;

  //     if (newFavoriteStatus) {
  //       // Nếu chuyển sang trạng thái yêu thích
  //       await favoriteAPI.addFavorite(item.productId); // Ghi vào cơ sở dữ liệu
  //       dispatch(addFavorite(item.productId)); // Cập nhật Redux
  //     } else {
  //       // Nếu bỏ yêu thích
  //       await favoriteAPI.removeFavorite(item.productId); // Xóa khỏi cơ sở dữ liệu
  //       dispatch(removeFavorite(item.productId)); // Cập nhật Redux
  //     }

  //     setIsFavorite(newFavoriteStatus); // Cập nhật trạng thái cục bộ
  //   } catch (error) {
  //     console.error('Failed to update favorite status:', error);
  //     // Nếu có lỗi, khôi phục trạng thái yêu thích ban đầu
  //     setIsFavorite(!isFavorite);
  //   }
  // }

  return (
    <View style={styles.container}>
      <RowComponent>
        <ImageBackground
          style={styles.image}
          source={{
            uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f90a69fc-1b25-41de-b008-34a791214918/NIKE+DUNK+LOW+RETRO.png',
          }}></ImageBackground>
        <View style={styles.content}>
          <RowComponent justify="space-between" styles={styles.row}>
            <TextComponent text="Nike Club Max" font="bold" size={16} />
            <TextComponent text="size" />
          </RowComponent>
          <RowComponent styles={styles.row}>
            <TextComponent text="2.900.000d" font="bold" />
          </RowComponent>
          <RowComponent justify="space-between" styles={{marginTop: 14}}>
            <RowComponent>
              <AntDesign
                name="minuscircle"
                color={appColors.primary}
                size={24}
              />
              <TextComponent text="1" styles={styles.number} size={16} />
              <AntDesign
                name="pluscircle"
                color={appColors.primary}
                size={24}
              />
            </RowComponent>
            <RowComponent>
              <Trash size="24" color="#000" />
            </RowComponent>
          </RowComponent>
        </View>
      </RowComponent>
    </View>
  );
};

export default ShoesCart;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    marginRight: 32,
  },
  content: {
    flex: 1,
    height: '100%',
    marginLeft: 16,
  },
  image: {
    height: 100,
    width: 100,
    padding: 10,
    borderRadius: 4,
  },
  row: {
    marginTop: 6,
  },
  number: {
    marginHorizontal: 20,
  },
});
