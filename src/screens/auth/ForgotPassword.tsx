import {ArrowRight, Danger, Sms} from 'iconsax-react-native';
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
import {Validate} from '../../utils/validate';
import {Alert, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';

const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckEmail = () => {
    const isValidEmail = Validate.Email(email);
    setIsDisable(!isValidEmail);
    !isValidEmail && setErrorMessage('Invalid email address.');
  };

  const handleForgotPassword = async () => {
    const api = '/forgotPassword';
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      navigation.navigate('CheckEmailPassword', {
        code: res.data.code,
        email: email,
      });

      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage('Email not found.');
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent isImageBackground back isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 55,
          marginBottom: 20,
        }}>
        <TextComponent
          title
          text="Recovery Password"
          styles={{marginBottom: 12}}
        />
        <TextComponent
          text="Please Enter Your Email Address To Recieve a Verification Code"
          color={appColors.coolGray}
          size={16}
          styles={{paddingHorizontal: 10, textAlign: 'center'}}
        />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => {
            setEmail(val);
            setErrorMessage('');
          }}
          allowClear
          affix={<Sms size={22} color={appColors.darkGray} />}
          onEnd={handleCheckEmail}
        />
      </SectionComponent>
      <SectionComponent styles={{marginHorizontal: 12}}>
        {errorMessage && (
          <SectionComponent>
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
          </SectionComponent>
        )}
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          text="Continue"
          type="primary"
          onPress={handleForgotPassword}
          size={16}
          icon={
            <View style={[globalStyles.iconContainer]}>
              <ArrowRight size={24} color={appColors.white} />
            </View>
          }
          iconFlex="right"
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ForgotPassword;
