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
import {RowComponent, SpaceComponent, TextComponent} from '../../components';

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

  const handlePayment = async () => {
    setLoading(true);

    try {
      const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
      const shippingAddress = {
        method: shipping.id,
        price: shipping.price,
        name: address.name,
        phone: address.phone,
        street: address.street,
        address: address.address,
      };
      const paymentDetails = {
        method: 'Cash',
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
  // useEffect(() => {
  //   if (item) {
  //     console.log('Order details:', item); // In ra chi tiết đơn hàng sau khi lấy thành công
  //   }
  // }, [item]);

  return (
    <View style={{flex: 1}}>
      <ContainerCart
        onPress={handlePayment}
        buttonText="Xác nhận thanh toán bằng tiền mặt"
        title="Tiền mặt">
        <View style={styles.contain}>
          <TextComponent text={`Tên người nhận: ${address.name}`} />
          <SpaceComponent line color="#000" />
          <TextComponent text={`Số điện thoại: ${address.phone}`} />
          <SpaceComponent line color="#000" />
          <TextComponent
            text={`Địa chỉ nhận hàng: ${address.street}, ${address.address}`}
          />
          <SpaceComponent line color="#000" />
          {/* </View>
        <View style={styles.contain}> */}
          <TextComponent text={`Phương thức thanh toán: Tiền mặt`} />
          <SpaceComponent line color="#000" />
          <TextComponent text={`Phương thức vận chuyển: ${shipping.label}`} />
          <SpaceComponent line color="#000" />
          <TextComponent text={`Phí vận chuyển: ${shipping.price}`} />
          <SpaceComponent line color="#000" />
          <TextComponent text={`Tổng tiền: ${pay}`} />
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
