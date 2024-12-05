import {View, FlatList, StyleSheet, Text, Image} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Shoes} from '../../models/ShoesModel';
import {ContainerComponent, ShoesList, SpaceComponent} from '../../components';

import {
  loadFavorites,
  loadFavoriteDetails,
  favoriteSelectorDetail,
} from '../../stores/reducers/favoriteSlice';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {fontFamilies} from '../../constants/fontFamilies';

const FavoriteScreen = () => {
  const dispatch = useAppDispatch();
  const favoriteDetails = useSelector(favoriteSelectorDetail);

  // Fetch favorites and their details when the screen is focused
  useFocusEffect(
    useCallback(() => {
      dispatch(loadFavorites()).then(() => {
        dispatch(loadFavoriteDetails());
      });
    }, [dispatch]),
  );

  return (
    <ContainerComponent title="Yêu thích" isImageBackground>
      {favoriteDetails.length > 0 ? (
        <>
          <FlatList
            data={favoriteDetails}
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
