import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {
  CartScreen,
  CashScreen,
  CheckoutScreen,
  ChooseAddressScreen,
  ChooseShippingScreen,
  MasterCardScreen,
  NotificationScreen,
  OrderDetailScreen,
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
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />

          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          {/* <Stack.Screen name="Setting" component={SettingScreen} /> */}
        </Stack.Navigator>
      </Host>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;
