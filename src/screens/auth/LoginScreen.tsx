import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Đăng nhập vào kiếm 10 điểm thôi</Text>
      <Button
        title="Login"
        onPress={async () => await AsyncStorage.setItem('assetToken', 'long')}
      />
    </View>
  );
};

export default LoginScreen;
