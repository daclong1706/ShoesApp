// HomeScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Adidas,
  Converse,
  Fila,
  Nike,
  Puma,
  UnderArmour,
} from '../../assets/svg';
import {appColors} from '../../constants/appColor';
import {
  CircleComponent,
  RowComponent,
  SectionComponent,
  ShoesCard,
  ShoesList,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {
  ArrowRight,
  Menu,
  SearchNormal1,
  ShoppingBag,
} from 'iconsax-react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import BrandFilter from './BrandFilter';
import productAPI from '../../apis/productAPI';
import {Shoes} from '../../models/ShoesModel';
import {fontFamilies} from '../../constants/fontFamilies';
import {appInfo} from '../../constants/appInfos';
import {useAppDispatch} from '../../stores/hook';
import {loadFavorites} from '../../stores/reducers/favoriteSlice';
import axios from 'axios';
import {AddressModel} from '../../models/AddressModel';
import {it} from 'node:test';

const HomeScreen = ({navigation}: any) => {
  const [shoes, setShoes] = useState<Shoes[]>([]);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(position => {
  //     if (position.coords) {
  //       reverseGeoCode({
  //         lat: position.coords.latitude,
  //         long: position.coords.longitude,
  //       });
  //     }
  //   });
  // }, []);

  // const reverseGeoCode = async ({lat, long}: {lat: number; long: number}) => {
  //   const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apiKey=FDSrRQkvtZ4QPx6QMNN1384RW_SNr8tPZfWsFs-HMS8`;
  //   try {
  //     const res = await axios(api);
  //     if (res && res.status === 200 && res.data) {
  //       const items = res.data.items;
  //       console.log(items[0]);
  //       setCurrentLocation(items[0]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await productAPI.getAllProducts();
        setShoes(res.data.shoes);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getAllProducts();
  }, []);

  const handleBrandSelect = (brandId: string | null) => {
    navigation.navigate('ProductScreen', {shoes: shoes, title: brandId});
  };

  const handleSeeAll = () => {
    navigation.navigate('ProductScreen', {shoes, title: 'All Shoes'});
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <RowComponent justify="center">
          <CircleComponent
            styles={{backgroundColor: appColors.white}}
            onPress={() => navigation.openDrawer()}>
            <Menu size={24} color={appColors.black} />
          </CircleComponent>
          <View style={styles.location}>
            <TextComponent
              text="Store location"
              color={appColors.gray}
              size={12}
            />
            <RowComponent>
              <FontAwesome6
                name="location-dot"
                size={14}
                color={appColors.danger}
              />
              <TextComponent text=" Ho Chi Minh City, Viet Nam" />
            </RowComponent>
          </View>
          <CircleComponent styles={{backgroundColor: appColors.white}}>
            <ShoppingBag size={24} color={appColors.black} />
            <View style={styles.notificationDot} />
          </CircleComponent>
        </RowComponent>
        <RowComponent styles={{marginTop: 20}}>
          <RowComponent
            styles={styles.searchBox}
            onPress={() => navigation.navigate('SearchScreen')}>
            <SearchNormal1
              size={24}
              color={appColors.gray}
              style={styles.searchIcon}
            />
            <TextComponent text="Looking for shoes" size={14} />
          </RowComponent>
        </RowComponent>
      </View>
      <ScrollView>
        {/* Brand Filter */}
        <BrandFilter onBrandSelect={handleBrandSelect} />

        {/* Popular Shoes */}
        <SectionComponent>
          <TabBarComponent title="Popular" onPress={handleSeeAll} />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={shoes.slice(0, 5)} // Hiển thị tối đa 5 sản phẩm
            renderItem={({item, index}) => (
              <ShoesList key={`Shoes ${index}`} item={item} type="card" />
            )}
            keyExtractor={item => item.productId}
            ListFooterComponent={
              shoes.length > 5 ? <SeeAllButton onPress={handleSeeAll} /> : null
            }
            nestedScrollEnabled
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

// SeeAllButton Component
const SeeAllButton = ({onPress}: {onPress: () => void}) => (
  <ShoesCard
    onPress={onPress}
    styles={{
      height: 295,
      maxHeight: 295,
      justifyContent: 'center',
      alignItems: 'center',
      width: appInfo.sizes.WIDTH * 0.4,
      backgroundColor: appColors.primary,
    }}>
    <TextComponent
      text="See All"
      color={appColors.white}
      size={16}
      font={fontFamilies.medium}
    />
    <ArrowRight color={appColors.white} size={24} />
  </ShoesCard>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: StatusBar.currentHeight,
  },
  location: {
    flex: 1,
    alignItems: 'center',
  },
  notificationDot: {
    backgroundColor: appColors.danger,
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 1.5,
    right: 1.5,
  },
  searchBox: {
    backgroundColor: appColors.white,
    width: '100%',
    height: 48,
    borderRadius: 50,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  searchIcon: {
    marginHorizontal: 14,
  },
  seeAllContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 70,
  },
});
