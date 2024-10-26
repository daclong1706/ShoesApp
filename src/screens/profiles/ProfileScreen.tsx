import {View, Text} from 'react-native';
import React from 'react';
import {ButtonComponent} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeAuth} from '../../stores/reducers/authReducer';
import {useDispatch} from 'react-redux';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      dispatch(removeAuth());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <ButtonComponent text="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
