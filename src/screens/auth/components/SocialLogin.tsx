import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColor';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Google, Facebook} from '../../../assets/svg';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import authenticationAPI from '../../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../../stores/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

GoogleSignin.configure({
  webClientId:
    '199291532897-jmhe6jroat626ikvps09cqsa2kf220lc.apps.googleusercontent.com',
});

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const api = '/login-google';

    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      if (userInfo && userInfo.data?.user) {
        const user = userInfo.data.user;

        const res: any = await authenticationAPI.HandleAuthentication(
          api,
          user,
          'post',
        );

        dispatch(addAuth(res.data));
        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        Toast.show({
          type: 'success',
          text1: 'Đăng nhập thành công',
          position: 'top',
          visibilityTime: 2000,
        });
      } else {
        console.log('User info is incomplete, login aborted.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionComponent>
      <TextComponent
        text="HOẶC"
        color={appColors.darkGray}
        font={fontFamilies.medium}
        styles={{textAlign: 'center'}}
      />
      <SpaceComponent height={10} />
      <ButtonComponent
        type="primary"
        onPress={handleLoginWithGoogle}
        color={appColors.white}
        textColor={appColors.text}
        size={18}
        text="Đăng nhập với Google"
        icon={<Google />}
        iconFlex="left"
        styles={{marginBottom: 15}}
      />

      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        size={18}
        text="Đăng nhập với Facebook"
        icon={<Facebook />}
        iconFlex="left"
        onPress={() => {
          Toast.show({
            type: 'info',
            text1: 'Phương thức hiện tại chưa được hỗ trợ',
            position: 'top',
            visibilityTime: 2000,
          });
        }}
      />
    </SectionComponent>
  );
};

export default SocialLogin;
