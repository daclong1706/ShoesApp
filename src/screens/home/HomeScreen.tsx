import React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../stores/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
