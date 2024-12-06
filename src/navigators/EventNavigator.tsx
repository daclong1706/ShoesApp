import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DiscoverScreen, EventScreen, FavoriteScreen} from '../screens';

const EventNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
    </Stack.Navigator>
  );
};

export default EventNavigator;
