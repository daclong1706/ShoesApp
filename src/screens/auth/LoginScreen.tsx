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
import {LoadingModal} from '../../modals';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setisLoading] = useState(false);

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
    setisLoading(true);
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
      Toast.show({
        type: 'success',
        text1: 'Đăng nhập thành công',
        position: 'top',
        visibilityTime: 2000,
      });
      setisLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại',
        position: 'top',
        visibilityTime: 2000,
      });
      setisLoading(false);
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
        <TextComponent
          title
          text="Chào mừng bạn quay lại!"
          size={28}
          styles={{marginBottom: 12}}
        />
        <TextComponent
          text="Chúng tôi đã nhớ bạn!"
          color={appColors.coolGray}
        />
      </SectionComponent>
      <SpaceComponent height={50} />
      <SectionComponent>
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
          placeholder="Mật khẩu"
          onChange={val => {
            setPassword(val);
            setErrorMessage({});
          }}
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
              text="Nhớ tôi"
              size={13}
              color={appColors.coolGray}
            />
          </RowComponent>
          <ButtonComponent
            type="link"
            text="Quên mật khẩu?"
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
          text="Đăng nhập"
          onPress={handleLogin}
          size={18}
        />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent styles={{flex: 1, justifyContent: 'flex-end'}}>
        <RowComponent justify="space-between" styles={{paddingHorizontal: 40}}>
          <TextComponent text="Bạn chưa có tài khoản?" size={12} />
          <ButtonComponent
            type="link"
            text="Đăng ký tài khoản"
            size={12}
            textColor={appColors.darkSlate}
            textStyles={{fontFamily: fontFamilies.medium}}
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default LoginScreen;
