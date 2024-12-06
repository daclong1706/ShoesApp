import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AddAddress,
  AddressList,
  ChangePasswordScreen,
  EditAddress,
  EditProfile,
  MapEditScreen,
  MapScreen,
  SettingScreen,
  PrivacyPolicyScreen,
  ProfileScreen,
} from '../screens';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddressList" component={AddressList} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="MapEditScreen" component={MapEditScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
