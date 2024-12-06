import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddAddress,
  CartScreen,
  CashScreen,
  CheckoutScreen,
  ChooseAddressScreen,
  ChooseShippingScreen,
  EditAddress,
  MapEditScreen,
  MapScreen,
  MasterCardScreen,
  PaymentMethod,
  PaypalScreen,
} from '../screens';

const CartNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen
        name="ChooseAddressScreen"
        component={ChooseAddressScreen}
      />

      <Stack.Screen
        name="ChooseShippingScreen"
        component={ChooseShippingScreen}
      />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="PaypalScreen" component={PaypalScreen} />
      <Stack.Screen name="MasterCardScreen" component={MasterCardScreen} />
      <Stack.Screen name="CashScreen" component={CashScreen} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="MapEditScreen" component={MapEditScreen} />
    </Stack.Navigator>
  );
};

export default CartNavigator;
