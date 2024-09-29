import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen, OnboardingScreen} from '../screens';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnbroadingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
