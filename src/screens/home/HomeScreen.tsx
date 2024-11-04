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
    productId: 'DV0833',
    name: 'Nike Dunk Low Retro',
    description:
      'Tôn vinh cội nguồn của Dunk như một biểu tượng của giày thể thao đại học hàng đầu, bộ sưu tập "Be True To Your School" lấy cảm hứng từ chiến dịch quảng cáo nguyên bản. Màu sắc đại diện cho các trường đại học danh tiếng, trong khi chất da bóng mượt tạo nên vẻ đẹp hoàn hảo, giúp bạn nổi bật ngay từ ánh nhìn đầu tiên. Vậy nên hãy xỏ giày vào, thể hiện tinh thần đại học của mình. Bạn đã sẵn sàng chưa?',
    price: 2929000,
    type: "Men's Shoes",
    brand: 'nike',
    colors: [
      {
        colorId: 'DV0833-109',
        colorName: 'White/Black/Dusty Cactus',
        colorImage:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f90a69fc-1b25-41de-b008-34a791214918/NIKE+DUNK+LOW+RETRO.png',
        colorCode: '#00B0C1',
        country: ['Việt Nam'],
        quantity: 10,
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9d1488be-d438-4953-9edf-72d18e30a74d/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/02ec94c0-4240-43aa-9299-49d9b2f1c722/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/aef9c1b6-ee2b-4967-baba-80a0d901b986/NIKE+DUNK+LOW+RETRO.png',
        ],
        discountPercentage: 30,
      },
      {
        colorId: 'DV0833-103',
        colorName: 'White/University Red/Concord',
        colorImage:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6b0e56a7-3f23-4943-9aeb-b56ee221d4b0/NIKE+DUNK+LOW+RETRO.png',
        colorCode: '#2E3C79',
        quantity: 0,
        country: ['Indonesia'],
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/df60a092-8601-4a69-ab71-ba13dd52eb4e/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9fb16a62-0167-47ac-b4cc-c54b064c95d7/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d5858135-cefe-4907-9a63-b5d295fd840f/NIKE+DUNK+LOW+RETRO.png',
        ],
        discountPercentage: 10,
      },
      {
        colorId: 'DV0833-104',
        colorName: 'White/Glacier Blue',
        colorImage:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d67c46a-cb99-4160-9d2a-3ad5f5d27782/NIKE+DUNK+LOW+RETRO.png',
        colorCode: '#B2D1D5',
        country: ['Indonesia'],
        quantity: 0,
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1f994c07-668f-427d-846c-45b735704fea/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/814151db-f368-47ba-9612-e1df2e33874e/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8c2a6322-5291-4b1c-9423-9965359bb77a/NIKE+DUNK+LOW+RETRO.png',
        ],
        discountPercentage: 0,
      },
      {
        colorId: 'DV0833-105',
        colorName: 'White/Pacific Moss',
        colorImage:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/80a05f38-1936-46f0-9b99-7ed0eb00849b/NIKE+DUNK+LOW+RETRO.png',
        colorCode: '#80680C',
        country: ['Việt nam'],
        quantity: 150,
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/82d4e6b8-e67b-4468-9efe-8c11ffe49e79/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fe071272-fafb-4520-a7f4-715d5ee50724/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bfdf1956-a64d-4e6d-9c21-68685e952f0e/NIKE+DUNK+LOW+RETRO.png',
        ],
        discountPercentage: 15,
      },
      {
        colorId: 'DV0833-107',
        colorName: 'White/White/Viotech',
        colorImage:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/62706490-bfa9-4227-b87c-6d95964fdc36/NIKE+DUNK+LOW+RETRO.png',
        colorCode: '#6C3761',
        country: ['Indonesia'],
        quantity: 10,
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bd86bb3f-5845-4a5c-9598-407c706b1083/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a8dec195-7f66-4130-9237-073c1a10fd1a/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9d367f6a-de7b-43cd-ad49-8c22f97dd192/NIKE+DUNK+LOW+RETRO.png',
        ],
        discountPercentage: 15,
      },
      {
        colorId: 'DV0833-111',
        colorName: 'White/White/Vintage Green',
        colorImage:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1cabc2f5-40fb-4fb8-8b8a-8718dace7c19/NIKE+DUNK+LOW+RETRO.png',
        colorCode: '#334A49',
        country: ['Indonesia'],
        quantity: 10,
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cf13a770-92c5-4506-8f66-fe3caf4a91b5/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/51c7be83-d8d3-434d-89d9-c7a121775e0d/NIKE+DUNK+LOW+RETRO.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f6661f7c-c4ea-40ac-91cf-fbac4f168914/NIKE+DUNK+LOW+RETRO.png',
        ],
        discountPercentage: 15,
      },
    ],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    features: [
      {
        description:
          'Màu sắc của giày giúp bạn thể hiện tình yêu với đội tuyển đại học yêu thích một cách đầy tự hào.',
        image:
          'https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/f0d7766d-2a6c-4f46-9857-904abadbc615/pdp.jpg',
      },
      {
        description:
          'Phần thân giày bằng da sẽ trở nên mềm mại tự nhiên theo thời gian, đạt đến độ hoàn hảo và êm ái tuyệt đối.',
        image:
          'https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/3733b19e-8a1f-4f6f-af28-5b84d5b00b8e/pdp.jpg',
      },
      {
        description:
          'Đệm giữa bằng foam mang đến sự êm ái nhẹ nhàng cùng độ đàn hồi vượt trội.',
        image:
          'https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/96dad303-8c81-4daf-9d3e-ca77a1531d3f/pdp.jpg',
      },
    ],
    reviews: [
      {
        username: 'MinhPhat123',
        date: '2024-11-02',
        rating: 4,
        comment:
          'Chất lượng khá tốt, rất hài lòng với thiết kế nhưng hơi chật ở mũi chân.',
      },
      {
        username: 'LinhVu',
        date: '2024-11-01',
        rating: 5,
        comment:
          'Đôi giày nhẹ và thoải mái, rất phù hợp cho những buổi đi bộ dài.',
      },
      {
        username: 'KhoaTran',
        date: '2024-10-30',
        rating: 3,
        comment: 'Màu sắc không giống lắm so với hình ảnh, nhưng vẫn ổn.',
      },
      {
        username: 'LanAnhNguyen',
        date: '2024-10-29',
        rating: 4,
        comment: 'Giày đẹp và dễ phối đồ, tuy nhiên hơi cứng ở phần gót.',
      },
      {
        username: 'HoangTuan',
        date: '2024-10-28',
        rating: 5,
        comment: 'Chất lượng vượt mong đợi! Rất hài lòng với đôi giày này.',
      },
      {
        username: 'ThaoMy',
        date: '2024-10-27',
        rating: 4,
        comment:
          'Đôi giày rất bền và màu sắc sang trọng, nhưng cần đi vài lần để mềm hơn.',
      },
      {
        username: 'DucVuong',
        date: '2024-10-25',
        rating: 5,
        comment:
          'Rất êm chân, tôi đã chạy cả buổi và không thấy khó chịu chút nào.',
      },
      {
        username: 'NgocMai98',
        date: '2024-10-24',
        rating: 3,
        comment: 'Giày đẹp nhưng phần đế hơi nặng, không phù hợp lắm để chạy.',
      },
      {
        username: 'BaoTran',
        date: '2024-10-23',
        rating: 4,
        comment: 'Đôi giày này có thiết kế rất độc đáo và hiện đại.',
      },
      {
        username: 'VanQuyen',
        date: '2024-10-20',
        rating: 5,
        comment: 'Không còn gì để chê, thực sự là đôi giày hoàn hảo!',
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
    brand: 'nike',
    colors: [
      {
        colorId: 'red-white',
        colorName: 'Red/White',
        colorImage: 'https://link.to/thumbnail_red_white.jpg',
        quantity: 10,
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
          nestedScrollEnabled
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
