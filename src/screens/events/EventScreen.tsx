import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useEffect} from 'react';
import {
  addToCart,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from '../../stores/reducers/cartSlice';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {createOrder} from '../../stores/reducers/orderSlice';
import {AccountModal} from '../../modals';

const EventScreen = () => {
  // const dispatch = useAppDispatch();

  // const handleCreateOrder = () => {
  //   const shippingAddress = {
  //     method: 'Normal',
  //     price: 15000,
  //     street: '123 Main St',
  //     city: 'Hanoi',
  //     state: 'HN',
  //     postalCode: '100000',
  //     country: 'Vietnam',
  //   };

  //   const paymentDetails = {
  //     method: 'Credit Card',
  //     status: 'Paid',
  //     transactionId: 'TXN123456789',
  //   };

  //   // Dispatch action tạo đơn hàng
  //   console.log('done');
  //   dispatch(createOrder({shippingAddress, paymentDetails}));
  // };
  return (
    <View style={styles.container}>
      {/* <Button title="Tạo đơn hàng" onPress={handleCreateOrder} /> */}
      {/* <AccountModal visible={true} /> */}
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
