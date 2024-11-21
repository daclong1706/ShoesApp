import React, {useState} from 'react';
import {
  View,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import stripeAPI from '../../apis/stripeAPI';
import ContainerCart from './components/ContainerCart';
import {appColors} from '../../constants/appColor';
import {TextComponent} from '../../components';
import Toast from 'react-native-toast-message';
import {LoadingModal} from '../../modals';
import OrderSuccess from '../../modals/OrderSuccess';

const PaymentScreen = ({navigation}: any) => {
  const {confirmPayment} = useStripe();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('10.00');
  const [visible, setVisible] = useState(false);

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

      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi khi thanh toán',
          position: 'bottom',
          visibilityTime: 2000,
        });
      } else if (paymentIntent) {
        console.log('Done');
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

  return (
    <View>
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
        visible={true}
        onOrder={() => {}}
        onShop={() => navigation.navigate('HomeScreen')}
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
