// HomeScreen.tsx
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Text,
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
  ButtonComponent,
  CircleComponent,
  RowComponent,
  SectionComponent,
  ShoesCard,
  ShoesList,
  SpaceComponent,
  TabBarBottom,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {
  ArrowRight,
  Menu,
  Notification,
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
import Geolocation from '@react-native-community/geolocation';
import ProductLabel from './components/ProductLabel';
import productLabelsData from './data/productLabels.json';
import Video from 'react-native-video';
import VideoItem from '../events/VideoItem';
import exploreAPI from '../../apis/exploreAPI';
import ExploreItem from './components/ExploreItem';

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const HomeScreen = ({navigation}: any) => {
  const [shoes, setShoes] = useState<Shoes[]>([]);
  const [brand, setBrand] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [explores, setExplores] = useState<any[]>([]);
  const videoRefs = useRef([]);

  const dispatch = useAppDispatch();

  const handleVideoPress = (videoSource: any) => {
    // Nếu video đang phát lại, dừng nó
    setCurrentVideo(currentVideo === videoSource ? null : videoSource);
  };

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

  useEffect(() => {
    const getAllExplores = async () => {
      try {
        const res = await exploreAPI.getAllExplores();
        setExplores(res.data.explores);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getAllExplores();
  }, []);

  const handleBrandSelect = (brandId: string | null) => {
    setBrand(brandId);
  };

  const handleBrandSelectSeeAll = (
    title: string | null,
    brand: boolean,
    label: boolean,
  ) => {
    navigation.navigate('ProductScreen', {
      shoes: shoes,
      title: title,
      brand: brand,
      label: label,
    });
  };

  const handleSeeAll = () => {
    navigation.navigate('ProductScreen', {shoes, title: 'All Shoes'});
  };

  const imageSources: Record<string, ImageSourcePropType> = {
    'nike-blue.png': require('../../assets/images/nike-blue.png'),
    'nike-green-x1.png': require('../../assets/images/nike-green-x1.png'),
    'nike-red.png': require('../../assets/images/nike-red.png'),
    'nike-yellow.png': require('../../assets/images/nike-yellow.png'),
    'nike-black.png': require('../../assets/images/nike-black.png'),
    'nike-pink.png': require('../../assets/images/nike-pink.png'),
    'nike-orange-2.png': require('../../assets/images/nike-orange-2.png'),
  };
  const error = console.error;
  console.error = (...args: any) => {
    if (/VirtualizedLists/.test(args[0])) return;
    error(...args);
  };

  const randomProductLabels = shuffleArray(productLabelsData).slice(0, 4);

  const renderProductLabels = randomProductLabels.map((item, index) => (
    <ProductLabel
      key={index}
      imageSource={imageSources[item.imageSource]} // Lấy đúng đường dẫn từ imageSources
      label={item.label}
      color={item.color}
      width={item.width}
      height={item.height}
      onPress={() => handleBrandSelectSeeAll(item.label, false, true)}
    />
  ));

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
          <CircleComponent
            styles={{backgroundColor: appColors.white}}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <Notification size={24} color={appColors.black} />
            {/* <View style={styles.notificationDot} /> */}
          </CircleComponent>
        </RowComponent>
        <RowComponent styles={{marginVertical: 20}}>
          <RowComponent
            styles={styles.searchBox}
            onPress={() => navigation.navigate('SearchScreen', {shoes: shoes})}>
            <SearchNormal1
              size={24}
              color={appColors.gray}
              style={styles.searchIcon}
            />
            <TextComponent text="Tìm kiếm giày ..." size={14} />
          </RowComponent>
        </RowComponent>
      </View>
      <ScrollView>
        {/* Brand Filter */}
        <BrandFilter onBrandSelect={handleBrandSelect} isFill id={brand} />
        <SectionComponent>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...shoes]
              .sort(() => Math.random() - 0.5)
              .filter(item => item.brand?.includes(brand as string))
              .slice(0, 5)}
            renderItem={({item, index}) => (
              <ShoesList key={`Shoes ${index}`} item={item} type="card" />
            )}
            keyExtractor={item => item.productId}
            ListFooterComponent={
              shoes.filter(item => item.brand?.includes(brand as string))
                .length > 5 ? (
                <SeeAllButton
                  onPress={() => handleBrandSelectSeeAll(brand, true, false)}
                />
              ) : null
            }
            nestedScrollEnabled
          />
        </SectionComponent>

        {/* Popular Shoes */}
        <TabBarComponent title="Popular" onPress={handleSeeAll} />
        <SectionComponent styles={{marginBottom: 10}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...shoes].sort(() => Math.random() - 0.5).slice(0, 5)}
            renderItem={({item, index}) => (
              <ShoesList key={`Shoes ${index}`} item={item} type="card" />
            )}
            keyExtractor={item => item.productId}
            ListFooterComponent={
              shoes.length > 5 ? <SeeAllButton onPress={handleSeeAll} /> : null
            }
            nestedScrollEnabled
          />

          {renderProductLabels}
          <SpaceComponent line color={appColors.coolGray} />
        </SectionComponent>
        <TabBarComponent title="Explore" hideSeeAll size={20} />
        <FlatList
          data={[...explores].slice(0, 3)}
          renderItem={({item, index}) => (
            <ExploreItem
              videoSource={item.videoSource}
              title={item.product.name}
              index={index}
              currentVideo={currentVideo}
              handleVideoPress={handleVideoPress}
              onPress={() => navigation.navigate('DiscoverScreen', {item})}
            />
          )}
          keyExtractor={item => item._id}
          nestedScrollEnabled
        />
        <SpaceComponent line />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Đắc Long. All Rights Reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// SeeAllButton Component
const SeeAllButton = ({onPress}: {onPress: () => void}) => (
  <ShoesCard
    onPress={onPress}
    styles={{
      height: 300,
      maxHeight: 300,
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
  containerVideo: {
    marginBottom: 10,
    position: 'relative',
  },
  backgroundVideo: {
    width: '100%',
    height: 300,
  },
  viewOverlay: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  textOverlay: {
    color: 'white',
    fontSize: 16,
    marginBottom: 6,
    fontFamily: 'LaOriental',
  },
  textTitleOverlay: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Facon',
  },
  button: {
    backgroundColor: appColors.white,
    paddingVertical: 8, // Padding dọc để button không bị quá rộng hoặc hẹp
    borderRadius: 25, // Đảm bảo bo góc đẹp
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    maxWidth: 140, // Thiết lập chiều rộng tối thiểu nếu cần
  },
  buttonText: {
    color: appColors.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  footer: {
    padding: 10,
    alignItems: 'center',

    height: 150,
  },
  footerText: {
    color: '#000',
    fontSize: 12,
  },
});
