import {Danger, PasswordCheck, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Switch} from 'react-native';
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
import authenticationAPI from '../../apis/authApi';
import {useDispatch} from 'react-redux';
import {Validate} from '../../utils/validate';
import {addAuth} from '../../stores/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formValidator} from './constants/validator';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage && (errorMessage.email || errorMessage.password)) ||
      !email ||
      !password
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage]);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/login',
        {email, password},
        'post',
      );
      dispatch(addAuth(res.data));
      await AsyncStorage.setItem(
        'auth',
        isRemember ? JSON.stringify(res.data) : email,
      );
    } catch (error) {
      formValidator('wrongPass', {}, errorMessage, setErrorMessage);
    }
  };

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
          onChange={val => {
            setEmail(val);
            setErrorMessage({});
          }}
          allowClear
          affix={<Sms size={22} color={appColors.darkGray} />}
          onEnd={() =>
            formValidator(
              'email',
              {email: email},
              errorMessage,
              setErrorMessage,
            )
          }
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => {
            setPassword(val);
            setErrorMessage({});
            // formValidator(
            //   'password',
            //   {password: val},
            //   errorMessage,
            //   setErrorMessage,
            // );
          }}
          allowClear
          isPassword
          affix={<PasswordCheck size={22} color={appColors.darkGray} />}
          // onEnd={() =>

          // }
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
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </RowComponent>
        <SectionComponent styles={{marginHorizontal: 12}}>
          {errorMessage && (
            <SectionComponent>
              {Object.keys(errorMessage).map((error, index) => (
                <RowComponent key={`row${index}`}>
                  <Danger
                    size={14}
                    color={appColors.danger}
                    style={{marginRight: 6}}
                  />
                  <TextComponent
                    text={errorMessage[`${error}`]}
                    key={`error${index}`}
                    color={appColors.danger}
                    size={12}
                  />
                </RowComponent>
              ))}
            </SectionComponent>
          )}
        </SectionComponent>
        <ButtonComponent
          disable={isDisable}
          type="primary"
          text="Sign In"
          onPress={handleLogin}
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
