import {View, FlatList, StyleSheet, Text, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Shoes} from '../../models/ShoesModel';
import {ContainerComponent, ShoesList, SpaceComponent} from '../../components';

import {
  loadFavorites,
  loadFavoriteDetails,
  favoriteSelectorDetail,
  removeFavoriteItem,
} from '../../stores/reducers/favoriteSlice';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {fontFamilies} from '../../constants/fontFamilies';
import ShoesFavorite from './ShoesFavorite';
import Toast from 'react-native-toast-message';
import {LoadingModal} from '../../modals';

const FavoriteScreen = () => {
  const dispatch = useAppDispatch();
  const favoriteDetails = useSelector(favoriteSelectorDetail);
  const [isLoading, setIsLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      dispatch(loadFavorites()).then(() => {
        dispatch(loadFavoriteDetails());
      });
      setIsLoading(false);
    }, [dispatch]),
  );

  const handleRemoveToFavorite = async (id: string) => {
    setIsLoading(true);
    await dispatch(removeFavoriteItem(id));

    Toast.show({
      type: 'info',
      text1: 'Đã xóa khỏi yêu thích',
      position: 'top',
      visibilityTime: 2000,
    });
    await dispatch(loadFavorites()).then(() => {
      dispatch(loadFavoriteDetails());
    });
    setIsLoading(false);
  };

  return (
    <ContainerComponent title="Yêu thích">
      {favoriteDetails.length > 0 ? (
        <>
          <FlatList
            data={favoriteDetails}
            renderItem={({item}) => (
              <View style={styles.shoesItem}>
                <ShoesFavorite
                  item={item}
                  onFavorite={() => {
                    handleRemoveToFavorite(item.productId);
                  }}
                />
              </View>
            )}
            keyExtractor={item => item.productId}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          />
          <SpaceComponent height={70} />
        </>
      ) : (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image
            source={require('../../assets/images/no-favorites-gray.png')}
            style={{
              width: 250,
              height: 250,
              marginTop: 100,
              marginBottom: 50,
            }}
            resizeMode="contain"
          />
          <Text style={{fontFamily: fontFamilies.regular}}>
            Chưa có sản phẩm nào được yêu thích
          </Text>
        </View>
      )}
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
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
    paddingTop: 20,
    paddingBottom: 30,
  },
  shoesItem: {
    flex: 1,
    marginHorizontal: 10,
    maxWidth: '50%',
  },
});
