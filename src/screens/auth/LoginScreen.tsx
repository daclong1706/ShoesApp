import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import InpuComponent from '../../components/InputComponent';
import {PasswordCheck, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColor';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={[
        globalStyles.container,
        {
          padding: 16,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <InpuComponent
        value={email}
        placeholder="Email"
        onChange={val => setEmail(val)}
        allowClear
        affix={<Sms size={22} color={appColors.darkGray} />}
      />
      <InpuComponent
        value={password}
        placeholder="Password"
        onChange={val => setPassword(val)}
        allowClear
        isPassword
        affix={<PasswordCheck size={22} color={appColors.darkGray} />}
      />
      {/* <Button
        title="Login"
        onPress={async () => await AsyncStorage.setItem('assetToken', 'long')}
        style={{
        
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
