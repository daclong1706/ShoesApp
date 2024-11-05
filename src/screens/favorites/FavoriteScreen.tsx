import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native'; // Thêm hook useFocusEffect
import {useSelector, useDispatch} from 'react-redux';
import {Shoes} from '../../models/ShoesModel';
import favoriteAPI from '../../apis/favoriteAPI'; // API layer để gọi backend
import {ShoesList} from '../../components';
import productAPI from '../../apis/productAPI';
import {
  setFavorites,
  favoriteSelector,
} from '../../stores/reducers/favoriteSlice';

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(favoriteSelector);
  const [shoes, setShoes] = React.useState<Shoes[]>([]);

  const getFavoriteShoes = async () => {
    try {
      const res = await favoriteAPI.getFavorite();
      const favorites = res.data.favorites;

      // Lấy thông tin chi tiết của từng sản phẩm yêu thích
      const detailedShoes = await Promise.all(
        favorites.map(async (fav: any) => {
          const productRes = await productAPI.getProductById(fav.productId);
          return productRes; // Giả sử productAPI.getProductById trả về thông tin chi tiết của sản phẩm
        }),
      );

      setShoes(detailedShoes);
      dispatch(setFavorites(favorites.map((fav: any) => fav.productId)));
    } catch (error) {
      console.error('Failed to fetch favorite shoes:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFavoriteShoes();
    }, []),
  );

  return (
    <View>
      <Text style={styles.title}>Favorite Shoes</Text>
      <FlatList
        data={shoes}
        renderItem={({item}) => (
          <View style={styles.shoesItem}>
            <ShoesList item={item} type="card" />
          </View>
        )}
        keyExtractor={item => item.productId}
        numColumns={2}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentContainer: {
    paddingVertical: 10,
  },
  shoesItem: {
    flex: 1,
    marginHorizontal: 10,
    maxWidth: '50%',
  },
});
