import {CardField, useStripe} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import stripeAPI from '../../apis/stripeAPI';
import {appColors} from '../../constants/appColor';
import ContainerCart from './components/ContainerCart';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {
  createOrder,
  currentOrderSelector,
  fetchOrderById,
  ordersSelector,
} from '../../stores/reducers/orderSlice';
import OrderSuccess from '../../modals/OrderSuccess';
import {
  cartSelector,
  clearCart,
  fetchCart,
} from '../../stores/reducers/cartSlice';
import {fontFamilies} from '../../constants/fontFamilies';
import {RowComponent, TextComponent} from '../../components';

const HERE_API_KEY = 'FDSrRQkvtZ4QPx6QMNN1384RW_SNr8tPZfWsFs-HMS8';

const CashScreen = ({navigation, route}: any) => {
  const {pay, shipping, address} = route.params;
  const {confirmPayment} = useStripe();
  const dispatch = useAppDispatch();
  const item = useAppSelector(currentOrderSelector);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('10.00');
  const [visible, setVisible] = useState(false);
  // console.log('Pay: ', pay);
  // console.log('Shipping: ', shipping);
  // console.log('Address: ', address);

  // // Reverse geocoding: Chuyển vĩ độ, kinh độ thành địa chỉ
  // const reverseGeoCode = async (lat: number, long: number) => {
  //   const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apiKey=${HERE_API_KEY}`;
  //   try {
  //     const res = await axios.get(api);
  //     if (res && res.status === 200 && res.data) {
  //       const items = res.data.items;
  //       if (items.length > 0) {
  //         setLocation(items[0]); // Cập nhật địa chỉ
  //       }
  //     }
  //   } catch (error) {
  //     console.log('Error fetching address:', error);
  //   }
  // };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
      const shippingAddress = {
        method: shipping.id,
        price: shipping.price,
        street: '123 Main St',
        city: 'Hanoi',
        state: 'HN',
        postalCode: '100000',
        country: 'Vietnam',
      };
      const paymentDetails = {
        method: 'Credit Card',
        status: 'Paid',
        transactionId: 'TM' + randomDigits,
      };

      const res = await dispatch(
        createOrder({shippingAddress, paymentDetails}),
      );
      const orderID = res.payload._id;
      dispatch(fetchOrderById(orderID));
      dispatch(clearCart());
      dispatch(fetchCart());
      setVisible(true);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Thanh toán không thành công',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (item) {
      console.log('Order details:', item); // In ra chi tiết đơn hàng sau khi lấy thành công
    }
  }, [item]);

  return (
    <View style={{flex: 1}}>
      <ContainerCart
        onPress={handlePayment}
        buttonText="Xác nhận thanh toán bằng tiền mặt"
        title="Tiền mặt">
        <View style={styles.contain}>
          <RowComponent>
            <TextComponent text="Địa chỉ nhận hàng: " />
          </RowComponent>
        </View>
        <View style={{alignItems: 'center'}}>
          <TextComponent
            text="Vui lòng kiểm tra hàng trước khi thanh toán!"
            color={appColors.danger}
          />
        </View>
      </ContainerCart>
      <OrderSuccess
        visible={visible}
        onOrder={() => {
          dispatch(fetchCart());
          navigation.navigate('OrderDetail', {item: item, success: true});
        }}
        onShop={() => {
          dispatch(fetchCart());
          navigation.navigate('HomeScreen');
        }}
      />
    </View>
  );
};

export default CashScreen;

const styles = StyleSheet.create({
  contain: {
    backgroundColor: appColors.white,
    padding: 24,
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 12,
    marginHorizontal: 12,
  },
});
