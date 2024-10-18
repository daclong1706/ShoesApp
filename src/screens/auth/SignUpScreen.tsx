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
          errorMessage.confirmPassword))
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

  const formValidator = (key: string) => {
    const data = {...errorMessage};
    let message = '';
    switch (key) {
      case 'email':
        if (!values.email) {
          message = 'Email is required.';
        } else if (!Validate.Email(values.email)) {
          message = 'Invalid email address.';
        } else {
          message = '';
        }
        break;
      case 'password':
        if (!values.password) {
          message = 'Password is required.';
        } else if (!Validate.Password(values.password)) {
          message =
            'Password must be at least 8 characters, including uppercase, lowercase, number, and special character.';
        } else {
          message = '';
        }
        break;
      case 'confirmPassword':
        if (!values.confirmPassword) {
          message = 'Please enter your confirm password.';
        } else if (values.confirmPassword !== values.password) {
          message = 'Passwords do not match.';
        } else {
          message = '';
        }
        break;
    }

    if (message) {
      data[`${key}`] = message;
    } else {
      delete data[`${key}`];
    }

    setErrorMessage(data);
  };

  const handleRegister = async () => {
    const api = '/verification';
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email: values.email},
        'post',
      );
      console.log(res);
    } catch (error) {
      console.log(error);
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
            onEnd={() => formValidator('email')}
          />
          <InputComponent
            value={values.password}
            placeholder="Your Password"
            onChange={val => handleChangeValue('password', val)}
            allowClear
            isPassword
            affix={<PasswordCheck size={22} color={appColors.darkGray} />}
            onEnd={() => formValidator('password')}
          />
          <InputComponent
            value={values.confirmPassword}
            placeholder="Confirm Password"
            onChange={val => handleChangeValue('confirmPassword', val)}
            allowClear
            isPassword
            affix={<PasswordCheck size={22} color={appColors.darkGray} />}
            onEnd={() => formValidator('confirmPassword')}
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
            text="Sign Up"
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
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;
