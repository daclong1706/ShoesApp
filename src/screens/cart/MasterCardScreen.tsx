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
        street: '123 Main St',
        city: 'Hanoi',
        state: 'HN',
        postalCode: '100000',
        country: 'Vietnam',
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
        title="Thanh toán bằng thẻ">
        {/* Thẻ thanh toán với hình ảnh nền */}

        {/* Form nhập thông tin thẻ */}

        <CardField
          postalCodeEnabled={false}
          style={styles.cardField}
          cardStyle={styles.cardInputStyle}
        />
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
});

export default PaymentScreen;
