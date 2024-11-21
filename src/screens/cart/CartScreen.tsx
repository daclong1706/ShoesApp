import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import ShoesCart from './ShoesCart';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {cartSelectorID, fetchCart} from '../../stores/reducers/cartSlice';
import productAPI from '../../apis/productAPI';
import {Cart} from '../../models/CartModel';
import {appColors} from '../../constants/appColor';
import {appInfo} from '../../constants/appInfos';
import {useNavigation} from '@react-navigation/native';
import ContainerCart from './components/ContainerCart';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(cartSelectorID);

  const navigation: any = useNavigation();

  const [shoes, setShoes] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Lấy dữ liệu giỏ hàng
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Lấy thông tin chi tiết sản phẩm và tính tổng giá
  useEffect(() => {
    const fetchDetailedShoes = async () => {
      const detailedShoes = await Promise.all(
        cart.map(async item => {
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

      setShoes(detailedShoes);

      // Tính tổng giá trị của giỏ hàng
      const total = detailedShoes.reduce((sum, shoe) => {
        return sum + shoe.price * shoe.quantity;
      }, 0);
      setTotalPrice(total);
    };

    if (cart.length > 0) {
      fetchDetailedShoes();
    }
  }, [cart]);

  return (
    <View style={{flex: 1}}>
      <ContainerCart isButton title="Giỏ hàng của tôi">
        {shoes.length > 0 ? (
          <>
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{marginBottom: 100}}>
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
            <Text>Giỏ hàng của bạn đang trống</Text>
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
