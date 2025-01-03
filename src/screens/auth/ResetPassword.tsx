import {ArrowRight, Danger, PasswordCheck, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
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
import {formValidator} from './constants/validator';
import Toast from 'react-native-toast-message';

const ResetPassword = ({navigation, route}: any) => {
  const {email} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.password || errorMessage.confirmPassword)) ||
      !password ||
      !confirmPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, password, confirmPassword]);

  const handleResetPassword = async () => {
    const api = '/resetPassword';
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email: email, newPassword: password},
        'post',
      );
      console.log(res.mess);
      navigation.navigate('LoginScreen');
      Toast.show({
        type: 'success',
        text1: 'Đổi mật khẩu thành công',
        position: 'top',
        visibilityTime: 2000,
      });
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Có lỗi trong quá trình thay đổi mật khẩu',
        position: 'top',
        visibilityTime: 2000,
      });
      console.log(`Can not reset password, ${error}`);
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
          text="Đặt mật khẩu mới"
          styles={{marginBottom: 12}}
        />
        <TextComponent
          text="Tạo mật khẩu mới. Hãy đảm bảo mật khẩu này khác với các mật khẩu trước để bảo mật."
          color={appColors.coolGray}
          size={16}
          styles={{paddingHorizontal: 10, textAlign: 'center'}}
        />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          value={password}
          placeholder="Mật khẩu của bạn"
          onChange={val => setPassword(val)}
          allowClear
          isPassword
          affix={<PasswordCheck size={22} color={appColors.darkGray} />}
          onEnd={() =>
            formValidator(
              'password',
              {password: password, confirmPassword: confirmPassword},
              errorMessage,
              setErrorMessage,
            )
          }
        />
        <InputComponent
          value={confirmPassword}
          placeholder="Nhập lại mật khẩu"
          onChange={val => setConfirmPassword(val)}
          allowClear
          isPassword
          affix={<PasswordCheck size={22} color={appColors.darkGray} />}
          onEnd={() =>
            formValidator(
              'confirmPassword',
              {password: password, confirmPassword: confirmPassword},
              errorMessage,
              setErrorMessage,
            )
          }
        />
      </SectionComponent>
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
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          text="Tiếp tục"
          type="primary"
          onPress={handleResetPassword}
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

export default ResetPassword;
