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

const initValue = {
  username: '',
  email: '',
  password: '',
  comfirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (values.email || values.password) {
      setErrorMessage('');
    }
  }, [values.email, values.password]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const handleRegister = async () => {
    const {email, password, comfirmPassword} = values;

    const emailValidation = Validate.Email(email);
    const passwordValidation = Validate.Password(password);

    if (email && password && comfirmPassword) {
      if (emailValidation) {
        if (passwordValidation) {
          if (password === comfirmPassword) {
            setIsLoading(true);
            try {
              const res = await authenticationAPI.HandleAuthentication(
                '/register',
                {
                  username: values.username,
                  email,
                  password,
                },
                'post',
              );

              dispatch(addAuth(res.data));
              await AsyncStorage.setItem('auth', JSON.stringify(res.data));
              setIsLoading(false);
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
            setErrorMessage('');
          } else {
            setErrorMessage('Passwords do not match.');
          }
        } else {
          setErrorMessage(
            'Password must be at least 8 characters long and contain [A-Z], [a-z], [0-9], [!@#$%^&*(),.?":{}|<>].',
          );
        }
      } else {
        setErrorMessage('Invalid email. Please enter a valid address.');
      }
    } else {
      setErrorMessage('Please enter complete information.');
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
          <SectionComponent styles={{marginHorizontal: 16}}>
            {errorMessage && (
              <RowComponent>
                <Danger
                  size={14}
                  color={appColors.danger}
                  style={{marginRight: 6}}
                />
                <TextComponent
                  text={errorMessage}
                  color={appColors.danger}
                  size={12}
                />
              </RowComponent>
            )}
          </SectionComponent>

          <ButtonComponent
            type="primary"
            text="Sign Up"
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
