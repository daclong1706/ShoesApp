import {Danger, PasswordCheck, Sms, User} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {LoadingModal} from '../../modals';
import {Validate} from '../../utils/validate';
import SocialLogin from './components/SocialLogin';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../stores/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formValidator} from './constants/validator';

interface ErrorMessage {
  email: string;
  password: string;
  confirmPassword: string;
}
const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const handleRegister = async () => {
    const api = '/verification';
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email: values.email},
        'post',
      );
      setIsLoading(false);
      navigation.navigate('Verification', {
        code: res.data.code,
        ...values,
      });
    } catch (error) {
      formValidator('useEmail', {}, errorMessage, setErrorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        <SectionComponent
          styles={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TextComponent
            title
            text="Đăng ký"
            size={28}
            styles={{marginBottom: 12}}
          />
          <TextComponent
            text="Tạo tài khoản ngay bây giờ thôi!"
            color={appColors.coolGray}
          />
        </SectionComponent>
        <SectionComponent>
          <InputComponent
            value={values.username}
            placeholder="Họ và tên"
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
            onEnd={() =>
              formValidator(
                'email',
                {email: values.email},
                errorMessage,
                setErrorMessage,
              )
            }
          />
          <InputComponent
            value={values.password}
            placeholder="Mật khẩu của bạn"
            onChange={val => handleChangeValue('password', val)}
            allowClear
            isPassword
            affix={<PasswordCheck size={22} color={appColors.darkGray} />}
            onEnd={() =>
              formValidator(
                'password',
                {password: values.password},
                errorMessage,
                setErrorMessage,
              )
            }
          />
          <InputComponent
            value={values.confirmPassword}
            placeholder="Nhập lại mật khẩu"
            onChange={val => handleChangeValue('confirmPassword', val)}
            allowClear
            isPassword
            affix={<PasswordCheck size={22} color={appColors.darkGray} />}
            onEnd={() =>
              formValidator(
                'confirmPassword',
                {
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                },
                errorMessage,
                setErrorMessage,
              )
            }
          />
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
            type="primary"
            text="Đăng ký"
            disable={isDisable}
            onPress={handleRegister}
            size={18}
          />
        </SectionComponent>

        <SocialLogin />

        <SectionComponent styles={{flex: 1, justifyContent: 'flex-end'}}>
          <RowComponent
            justify="space-between"
            styles={{paddingHorizontal: 70}}>
            <TextComponent text="Bạn đã có tài khoản?" size={12} />
            <ButtonComponent
              type="link"
              text="Đăng nhập"
              size={12}
              textColor={appColors.darkSlate}
              textStyles={{fontFamily: fontFamilies.medium}}
              onPress={() => navigation.navigate('LoginScreen')}
            />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;
