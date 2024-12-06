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
import {SpaceComponent, TextComponent} from '../../components';

const PaymentScreen = ({navigation, route}: any) => {
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
      const {clientSecret} = await stripeAPI.createPaymentIntent(amount);

      console.log('Client Secret:', clientSecret);

      if (!clientSecret) {
        Alert.alert('Error', 'Failed to create payment intent');
        setLoading(false);
        return;
      }

      // Sử dụng Stripe SDK để xác nhận thanh toán
      const {error, paymentIntent} = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });
      // console.log('ID :', paymentIntent);
      const shippingAddress = {
        method: shipping.id,
        price: shipping.price,
        name: address.name,
        phone: address.phone,
        street: address.street,
        address: address.address,
      };
      const paymentDetails = {
        method: 'Credit Card',
        status: 'Paid',
        transactionId: paymentIntent?.id,
      };
      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi khi thanh toán',
          position: 'bottom',
          visibilityTime: 2000,
        });
      } else if (paymentIntent) {
        const res = await dispatch(
          createOrder({shippingAddress, paymentDetails}),
        );
        const orderID = res.payload._id;
        dispatch(fetchOrderById(orderID));
        dispatch(clearCart());
        dispatch(fetchCart());
        setVisible(true);
      }
    } catch (error) {
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
        buttonText="Thanh toán"
        title="Thanh toán bằng thẻ"
        isScroll>
        {/* Thẻ thanh toán với hình ảnh nền */}
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
          <TextComponent text={`Phương thức thanh toán: Thẻ tín dụng`} />
          <SpaceComponent line color="#000" />
          <TextComponent text={`Phương thức vận chuyển: ${shipping.label}`} />
          <SpaceComponent line color="#000" />
          <TextComponent text={`Phí vận chuyển: ${shipping.price}`} />
          <SpaceComponent line color="#000" />
          <TextComponent text={`Tổng tiền: ${pay}`} />
        </View>

        {/* Form nhập thông tin thẻ */}

        <CardField
          postalCodeEnabled={false}
          style={styles.cardField}
          cardStyle={styles.cardInputStyle}
        />
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

const styles = StyleSheet.create({
  cardField: {
    height: 60,
    margin: 20,
  },
  cardInputStyle: {
    fontFamily: fontFamilies.medium,
    backgroundColor: appColors.grayTint,
    borderRadius: 12,
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
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

export default PaymentScreen;
