// HomeScreen.tsx
import React, {useState} from 'react';
import {View, StatusBar, StyleSheet, ScrollView, FlatList} from 'react-native';
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
  ShoesList,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {Menu, SearchNormal1, ShoppingBag} from 'iconsax-react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import BrandFilter from './BrandFilter'; // Import component mới
import PopularShoes from './PopularShoes';
import {it} from 'node:test';
import {Shoes} from '../../models/ShoesModel';

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

const shoes: Shoes[] = [
  {
    productId: 'CW2288-111',
    name: 'Nike Air Jordan',
    description:
      'Air Jordan là một thương hiệu giày thể thao bóng rổ nổi tiếng...',
    price: 2929000,
    colors: [
      {
        colorId: 'blue-white',
        colorName: 'Blue/White',
        colorImage:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/80a05f38-1936-46f0-9b99-7ed0eb00849b/NIKE+DUNK+LOW+RETRO.png',
        colorCode: '#fffff',
        images: [
          'https://link.to/blue_white_image1.jpg',
          'https://link.to/blue_white_image2.jpg',
          'https://link.to/blue_white_image3.jpg',
        ],
        discountPercentage: 30,
      },
      {
        colorId: 'blue-black',
        colorName: 'Blue/Black',
        colorImage:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f90a69fc-1b25-41de-b008-34a791214918/NIKE+DUNK+LOW+RETRO.png',
        colorCode: 'red',
        images: [
          'https://link.to/blue_white_image1.jpg',
          'https://link.to/blue_white_image2.jpg',
          'https://link.to/blue_white_image3.jpg',
        ],
        discountPercentage: 30,
      },
    ],
    sizes: ['38', '39', '40', '41', '42', '43'],
    features: [
      {
        description: 'Đế giữa bằng foam nhẹ, đàn hồi tốt',
        image: 'https://link.to/feature_image1.jpg',
      },
    ],
    reviews: [
      {
        username: 'AnthonyT904858449',
        date: '2024-10-17',
        rating: 5,
        comment: 'Màu sắc của đôi giày thật tuyệt vời...',
      },
    ],
    similarProductIds: ['JAM123', 'DUNK234'],
    benefits: [
      'The stitched overlays on the upper add heritage style, durability and support.',
    ],
    productDetails: ['Foam midsole', 'Perforations on the toe', 'Rubber sole'],
    origins:
      'Debuting in 1982, the AF-1 was the first basketball shoe to house Nike Air.',
    label: 'Best Seller', // Gắn nhãn Best Seller
  },
  {
    productId: 'CW2299-222',
    name: 'Nike Air Max',
    description: 'Nike Air Max là dòng giày thể thao nổi bật...',
    price: 920.5,
    colors: [
      {
        colorId: 'red-white',
        colorName: 'Red/White',
        colorImage: 'https://link.to/thumbnail_red_white.jpg',
        images: [
          'https://link.to/red_white_image1.jpg',
          'https://link.to/red_white_image2.jpg',
        ],
      },
    ],
    sizes: ['40', '41', '42', '43', '44'],
    features: [
      {
        description: 'Công nghệ Air Max êm ái, thoải mái',
        image: 'https://link.to/feature_image2.jpg',
      },
    ],
    reviews: [
      {
        username: 'User123',
        date: '2024-09-10',
        rating: 4,
        comment: 'Giày đẹp, mang rất thoải mái.',
      },
    ],
    similarProductIds: ['JAM125', 'DUNK236'],
    benefits: ['Designed with Air Max technology for comfort.'],
    productDetails: ['Air Max sole', 'Breathable mesh upper'],
    origins:
      'The Air Max revolutionized sports footwear with its visible air pocket.',
    label: 'Best Choice', // Gắn nhãn Best Choice
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
      <ScrollView>
        {/* <BrandFilter
        // brands={brands}
        // selectedBrand={selectedBrand}
        // onPress={handlePress}
        /> */}

        <BrandFilter />
        {/* <TabBarComponent title="Popular" /> */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array.from({length: 5})}
          renderItem={({item, index}) => (
            <ShoesList key={`Shoes ${index}`} item={shoes[0]} type="card" />
          )}
        />

        <PopularShoes
          shoes={products}
          onSeeAll={handleSeeAll}
          onAddToCart={handleAddToCart}
        />
        <PopularShoes
          shoes={products}
          onSeeAll={handleSeeAll}
          onAddToCart={handleAddToCart}
        />
        <PopularShoes
          shoes={products}
          onSeeAll={handleSeeAll}
          onAddToCart={handleAddToCart}
        />
      </ScrollView>
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
  // content: {
  //   paddingLeft: StatusBar.currentHeight,
  // },
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
});
