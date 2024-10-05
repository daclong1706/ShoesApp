import {PasswordCheck, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Switch} from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import SocialLogin from './components/SocialLogin';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 55,
        }}>
        {/* <Image
          source={require('../../assets/images/nike.png')}
          style={{width: 162, height: 114, marginBottom: 30}}
        /> */}
        <TextComponent
          title
          text="Hello Again!"
          size={28}
          styles={{marginBottom: 12}}
        />
        <TextComponent
          text="Welcome Back You’ve Been Missed!"
          color={appColors.coolGray}
        />
      </SectionComponent>
      <SpaceComponent height={50} />
      <SectionComponent>
        {/* <TextComponent title text="Sign in" /> */}
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
              style={{marginRight: 12}}
            />
            <TextComponent
              text="Remember me"
              size={13}
              color={appColors.coolGray}
            />
          </RowComponent>
          <ButtonComponent
            type="link"
            text="Recovery Password"
            textColor={appColors.coolGray}
            size={13}
            onPress={() => navigation.navigate('RecoveryPassword')}
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

      <SectionComponent styles={{flex: 1, justifyContent: 'flex-end'}}>
        <RowComponent justify="space-between" styles={{paddingHorizontal: 40}}>
          <TextComponent text="Don’t have an account?" size={12} />
          <ButtonComponent
            type="link"
            text="Sign Up For Free"
            size={12}
            textColor={appColors.darkSlate}
            textStyles={{fontFamily: fontFamilies.medium}}
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
