// HomeScreen.tsx
import React, {useState} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {
  Adidas,
  Converse,
  Fila,
  Nike,
  Puma,
  UnderArmour,
} from '../../assets/svg';
import {appColors} from '../../constants/appColor';
import {CircleComponent, RowComponent, TextComponent} from '../../components';
import {Menu, SearchNormal1, ShoppingBag} from 'iconsax-react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import BrandFilter from './BrandFilter'; // Import component mới
import PopularShoes from './PopularShoes';

const brands = [
  {id: 'nike', text: 'Nike', icon: <Nike />},
  {id: 'puma', text: 'Puma', icon: <Puma />},
  {id: 'vans', text: 'Under Armour', icon: <UnderArmour />},
  {id: 'adidas', text: 'Adidas', icon: <Adidas />},
  {id: 'converse', text: 'Converse', icon: <Converse />},
  {id: 'fila', text: 'Fila', icon: <Fila />},
];

// productData.js
export const products = [
  {
    id: '1',
    name: 'Nike Jordan',
    price: '493.00',
    image: require('../../assets/images/nike-air-jordan.png'),
  },
  {
    id: '2',
    name: 'Nike Air Max',
    price: '897.99',
    image: require('../../assets/images/nike-jordan.png'),
  },
  {
    id: '3',
    name: 'Adidas Ultra Boost',
    price: '599.00',
    image: require('../../assets/images/nike.png'),
  },
  {
    id: '4',
    name: 'Puma Future Rider',
    price: '349.99',
    image: require('../../assets/images/nike.png'),
  },
  {
    id: '5',
    name: 'Converse All Star',
    price: '120.00',
    image: require('../../assets/images/nike.png'),
  },
  {
    id: '6',
    name: 'Reebok Classic',
    price: '220.00',
    image: require('../../assets/images/nike.png'),
  },
  {
    id: '7',
    name: 'New Balance 990',
    price: '180.00',
    image: require('../../assets/images/nike.png'),
  },
  {
    id: '8',
    name: 'Nike Blazer Mid',
    price: '139.99',
    image: require('../../assets/images/nike.png'),
  },
  {
    id: '9',
    name: 'Vans Old Skool',
    price: '90.00',
    image: require('../../assets/images/nike.png'),
  },
];

const HomeScreen = ({navigation}: any) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handlePress = (brandId: string) => {
    // Nếu nhấn vào brand đã chọn, bỏ chọn; nếu không, cập nhật thành brand mới
    setSelectedBrand(prevSelected =>
      prevSelected === brandId ? null : brandId,
    );
  };

  const handleSeeAll = () => {
    // Logic khi nhấn "See all"
    console.log('See all products');
  };

  const handleAddToCart = (shoeId: string) => {
    // Logic khi thêm sản phẩm vào giỏ hàng
    console.log(`Added product with ID: ${shoeId}`);
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
      <View style={styles.content}>
        <BrandFilter
        // brands={brands}
        // selectedBrand={selectedBrand}
        // onPress={handlePress}
        />
      </View>
      <View style={styles.content}>
        <PopularShoes
          shoes={products}
          onSeeAll={handleSeeAll}
          onAddToCart={handleAddToCart}
        />
      </View>
    </View>
  );
};

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
  content: {
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
    elevation: 16,
  },
  searchIcon: {
    marginHorizontal: 14,
  },
});
