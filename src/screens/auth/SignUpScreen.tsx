import {PasswordCheck, Sms, User} from 'iconsax-react-native';
import React, {useState} from 'react';
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

const initValue = {
  username: '',
  email: '',
  password: '',
  comfirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TextComponent
          title
          text="Create Account"
          size={28}
          styles={{marginBottom: 12}}
        />
        <TextComponent
          text="Let’s Create Account Together"
          color={appColors.coolGray}
        />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          value={values.username}
          placeholder="Full name"
          onChange={val => handleChangeValue('username', val)}
          allowClear
          affix={<User size={22} color={appColors.darkGray} />}
        />
        <InputComponent
          value={values.email}
          placeholder="Email"
          onChange={val => handleChangeValue('email', val)}
          allowClear
          affix={<Sms size={22} color={appColors.darkGray} />}
        />
        <InputComponent
          value={values.password}
          placeholder="Your Password"
          onChange={val => handleChangeValue('password', val)}
          allowClear
          isPassword
          affix={<PasswordCheck size={22} color={appColors.darkGray} />}
        />
        <InputComponent
          value={values.comfirmPassword}
          placeholder="Confirm Password"
          onChange={val => handleChangeValue('comfirmPassword', val)}
          allowClear
          isPassword
          affix={<PasswordCheck size={22} color={appColors.darkGray} />}
        />
        <SpaceComponent height={30} />

        <ButtonComponent
          type="primary"
          text="Sign Up"
          onPress={() => console.log('Login')}
          size={18}
        />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent justify="space-between" styles={{paddingHorizontal: 70}}>
          <TextComponent text="Already have an account?" size={12} />
          <ButtonComponent
            type="link"
            text="Sign in"
            size={12}
            textColor={appColors.darkSlate}
            textStyles={{fontFamily: fontFamilies.medium}}
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignUpScreen;
