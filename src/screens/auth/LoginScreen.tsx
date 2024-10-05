import {View, Text, Button, Image, Switch} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import InpuComponent from '../../components/InputComponent';
import {PasswordCheck, Size, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import SocialLogin from './components/SocialLogin';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  return (
    <ContainerComponent isImageBackground>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/nike.png')}
          style={{width: 162, height: 114, marginBottom: 30}}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent title text="Sign in" />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.darkGray} />}
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          allowClear
          isPassword
          affix={<PasswordCheck size={22} color={appColors.darkGray} />}
        />
        <SpaceComponent height={19} />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Remember me" />
          </RowComponent>
          <ButtonComponent
            type="link"
            text="Forgot Password?"
            onPress={() => {}}
          />
        </RowComponent>
        <SpaceComponent height={20} />
        <ButtonComponent
          type="primary"
          text="Sign In"
          onPress={() => console.log('Login')}
          size={18}
        />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent justify="space-between" styles={{paddingHorizontal: 40}}>
          <TextComponent text="Don’t have an account?" size={12} />
          <ButtonComponent
            type="link"
            text="Sign Up For Free"
            size={12}
            textColor={appColors.darkSlate}
            textStyles={{fontFamily: fontFamilies.medium}}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
