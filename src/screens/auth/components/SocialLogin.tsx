import {View, Text} from 'react-native';
import React from 'react';
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

GoogleSignin.configure({
  webClientId:
    '199291532897-totmithrtcq87rcc5tq0k2cm67lddo5a.apps.googleusercontent.com',
});

const SocialLogin = () => {
  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionComponent>
      <TextComponent
        text="OR"
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
        text="Sign in with google"
        icon={<Google />}
        iconFlex="left"
        styles={{marginBottom: 15}}
      />

      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        size={18}
        text="Sign in with facebook"
        icon={<Facebook />}
        iconFlex="left"
      />
    </SectionComponent>
  );
};

export default SocialLogin;
