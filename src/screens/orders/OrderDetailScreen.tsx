import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import ShoesCart from '../cart/ShoesCart';
import productAPI from '../../apis/productAPI';
import {appColors} from '../../constants/appColor';
import {Cart} from '../../models/CartModel';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InfoRow from './components/InfoRow';
import {fontFamilies} from '../../constants/fontFamilies';
import {it} from 'node:test';
import {useNavigation} from '@react-navigation/native';

interface ShippingMethod {
  id: string;
  label: string;
  icon: string;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: 'Economy',
    label: 'Tiết kiệm',
    icon: 'coins',
  },
  {
    id: 'Normal',
    label: 'Bình thường',
    icon: 'box',
  },
  {
    id: 'Delivery',
    label: 'Chuyển phát nhanh',
    icon: 'truck',
  },
  {
    id: 'Express',
    label: 'Hỏa tốc',
    icon: 'truck-fast',
  },
];

const OrderDetailScreen = ({navigation, route}: any) => {
  const {item: item, success: success}: any = route.params;
  const [shoes, setShoes] = useState<Cart[]>([]);
  const [shipping, setShipping] = useState<ShippingMethod>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Định dạng ngày và giờ theo múi giờ khu vực (UTC+7 cho Việt Nam)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh', // Múi giờ của Việt Nam
      hour12: false, // Định dạng 24 giờ
    };

    return date.toLocaleString('en-GB', options); // 'en-GB' để đảm bảo định dạng ngày/tháng/năm đúng
  };

  // Lấy thông tin chi tiết sản phẩm và tính tổng giá
  useEffect(() => {
    const fetchDetailedShoes = async () => {
      const detailedShoes = await Promise.all(
        item.items.map(async (item: any) => {
          const productRes = await productAPI.getProductById(item.productId);
          const productData = productRes.data.shoes;

          const selectedColorData = productData.colors.find(
            (color: any) => color.colorId === item.selectedColor,
          );

          const priceDiscount =
            productData.price -
            (productData.price *
              (selectedColorData?.discountPercentage ??
                productData.discountPercentage)) /
              100;

          return {
            productId: productData.productId,
            name: productData.name,
            colorName: selectedColorData ? selectedColorData.colorName : '',
            colorImage: selectedColorData ? selectedColorData.colorImage : '',
            price: priceDiscount,
            quantity: item.quantity,
            selectedColor: item.selectedColor ?? '',
            selectedSize: item.selectedSize ?? '',
          };
        }),
      );

      shippingMethods.map(ship => {
        if (ship.id === item.shippingAddress.method) {
          setShipping(ship);
        }
      });

      setShoes(detailedShoes);
    };

    if (item.items.length > 0) {
      fetchDetailedShoes();
    }
  }, [item]);

  const handleBack = () => {
    if (success) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={{flex: 1}}>
      <ContainerComponent
        title="Chi tiết hóa đơn"
        back
        isScroll
        onPress={handleBack}>
        <View style={styles.container}>
          <Text style={styles.title}>Thông tin hóa đơn</Text>
          <SpaceComponent line />
          <InfoRow
            icon={
              <MaterialCommunityIcons
                name="identifier"
                size={24}
                color={appColors.white}
              />
            }
            value={item._id}
          />
          <InfoRow
            icon={
              <FontAwesome6
                name="calendar-days"
                size={20}
                color={appColors.white}
              />
            }
            value={formatDate(item.orderDate)}
          />
          <InfoRow
            icon={
              <FontAwesome6
                name="location-dot"
                size={20}
                color={appColors.white}
              />
            }
            value={`${item.shippingAddress.street}, ${item.shippingAddress.city}, ${item.shippingAddress.country}`}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Danh sách sản phẩm</Text>
          <SpaceComponent line />
          {shoes.map((shoe, index) => (
            <ShoesCart key={shoe.productId + index} item={shoe} isOrder />
          ))}
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Phương thức vận chuyển</Text>
          <SpaceComponent line />
          <RowComponent justify="space-between">
            <RowComponent>
              <View style={styles.iconContainer}>
                <FontAwesome6
                  name={shipping?.icon as string}
                  size={22}
                  color={appColors.primary}
                />
              </View>
              <Text style={styles.text}>{shipping?.label}</Text>
            </RowComponent>
          </RowComponent>
        </View>
        <View style={[styles.container, {marginBottom: 100}]}>
          <RowComponent justify="space-between">
            <TextComponent text="Thành tiền" />
            <TextComponent text={`${item.totalAmount.toLocaleString()} ₫`} />
          </RowComponent>
          <RowComponent justify="space-between" styles={{marginVertical: 12}}>
            <TextComponent text="Phí vận chuyển" />
            <TextComponent
              text={`${item.shippingAddress.price.toLocaleString()} ₫`}
            />
          </RowComponent>
          <SpaceComponent line />
          <RowComponent justify="space-between" styles={{marginVertical: 12}}>
            <TextComponent text="Tổng tiền" font={fontFamilies.medium} />
            <TextComponent
              text={`${(
                item.totalAmount + item.shippingAddress.price
              ).toLocaleString()} ₫`}
              font={fontFamilies.medium}
            />
          </RowComponent>
        </View>
      </ContainerComponent>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',

    // Shadow for iOS
    shadowColor: '#000', // Màu sắc của shadow
    shadowOffset: {width: 0, height: 2}, // Vị trí của shadow
    shadowOpacity: 0.3, // Độ mờ của shadow
    shadowRadius: 4, // Độ lan tỏa của shadow

    // Shadow for Android
    elevation: 5, // Độ cao của shadow
  },
  title: {
    fontSize: 16,
    marginVertical: 6,
    color: appColors.black,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: appColors.primary,
    marginVertical: 4,
    marginLeft: 12,
  },
  iconContainer: {
    padding: 10,
    width: 54,
    height: 54,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
