import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {
  CartScreen,
  CheckoutScreen,
  ChooseShippingScreen,
  MasterCardScreen,
  OrderListScreen,
  PaymentMethod,
  PaypalScreen,
} from '../screens';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen name="Order" component={OrderListScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <Stack.Screen
            name="ChooseShippingScreen"
            component={ChooseShippingScreen}
          />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="PaypalScreen" component={PaypalScreen} />
          <Stack.Screen name="MasterCardScreen" component={MasterCardScreen} />

          {/* <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} /> */}
        </Stack.Navigator>
      </Host>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;
