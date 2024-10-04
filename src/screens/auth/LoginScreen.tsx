import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';

const LoginScreen = () => {
  return (
    <View
      style={[globalStyles.container, {padding: 16, backgroundColor: 'coral'}]}>
      <Text>Đăng nhập vào kiếm 10 điểm thôi</Text>
      {/* <Button
        title="Login"
        onPress={async () => await AsyncStorage.setItem('assetToken', 'long')}
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      /> */}
      <ButtonComponent
        type="primary"
        text="Login"
        onPress={() => console.log('Login')}
        icon={
          <View>
            <Text>N</Text>
          </View>
        }
      />
    </View>
  );
};

export default LoginScreen;
