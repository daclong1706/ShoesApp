import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import ShoesCart from './ShoesCart';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {cartSelector, fetchCart} from '../../stores/reducers/cartSlice';
import productAPI from '../../apis/productAPI';
import {Cart} from '../../models/CartModel';
import {appColors} from '../../constants/appColor';
import {appInfo} from '../../constants/appInfos';
import {useNavigation} from '@react-navigation/native';
import ContainerCart from './components/ContainerCart';
import {fontFamilies} from '../../constants/fontFamilies';
import {
  addressesSelector,
  fetchAddresses,
} from '../../stores/reducers/addressSlice';
import {Loading, LoadingModal} from '../../modals';

const selectedAddress = {
  _id: '',
  address: '',
  isDefault: false,
  name: '',
  phone: '',
  street: '',
};

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(cartSelector);

  const navigation: any = useNavigation();

  const [shoes, setShoes] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const addresses = useAppSelector(addressesSelector);
  const defaultAddress = addresses.find(address => address.isDefault === true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch addresses và cart
        await dispatch(fetchAddresses());
        await dispatch(fetchCart());

        // Khi cart có dữ liệu, tiến hành tải chi tiết giày
        if (cart.length > 0) {
          const detailedShoes = await Promise.all(
            cart.map(async item => {
              const productRes = await productAPI.getProductById(
                item.productId,
              );
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
                colorImage: selectedColorData
                  ? selectedColorData.colorImage
                  : '',
                price: priceDiscount,
                quantity: item.quantity,
                selectedColor: item.selectedColor ?? '',
                selectedSize: item.selectedSize ?? '',
              };
            }),
          );

          setShoes(detailedShoes);

          // Tính tổng giá trị của giỏ hàng
          const total = detailedShoes.reduce(
            (sum, shoe) => sum + shoe.price * shoe.quantity,
            0,
          );
          setTotalPrice(total);
        } else {
          setShoes([]);
          setTotalPrice(0);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, cart.length]);

  const shoesLength = shoes.length;

  return (
    <View style={{flex: 1}}>
      <ContainerCart isButton title="Giỏ hàng của tôi">
        {isLoading ? (
          <Loading mess="Đang tải sản phẩm..." />
        ) : shoesLength > 0 ? (
          <>
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{marginBottom: 100, paddingHorizontal: 16}}>
              {shoes.map((shoe, index) => (
                <ShoesCart key={shoe.productId + index} item={shoe} />
              ))}
            </ScrollView>

            {/* Nút "Thanh toán" luôn hiển thị ở dưới cùng */}
            <View style={styles.checkoutButtonContainer}>
              <RowComponent justify="space-between">
                <View>
                  <TextComponent text="Thành tiền" />
                  <TextComponent
                    text={`${totalPrice.toLocaleString()} đ`}
                    styles={styles.totalPrice}
                  />
                </View>
                <ButtonComponent
                  onPress={() =>
                    navigation.navigate('CheckoutScreen', {
                      shoes: shoes,
                      total: totalPrice,
                      selectedAddress: defaultAddress
                        ? defaultAddress
                        : selectedAddress,
                    })
                  }
                  text="Thanh toán"
                  type="primary"
                  styles={{width: appInfo.sizes.WIDTH * 0.5}}
                />
              </RowComponent>
            </View>
          </>
        ) : (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              source={require('../../assets/images/cart-empty.png')}
              style={{
                width: 250,
                height: 250,
                marginTop: 100,
                marginBottom: 50,
              }}
              resizeMode="contain"
            />
            <Text style={{fontFamily: fontFamilies.regular}}>
              Giỏ hàng của bạn đang trống
            </Text>
          </View>
        )}
      </ContainerCart>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  checkoutButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    borderColor: '#EEEEEE',
    borderWidth: 1,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.primary,
  },
});
