import {ArrowRight, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';

const RecoveryPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <ContainerComponent isImageBackground back>
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
        {/* <TextComponent
          text="Email Address"
          size={16}
          font={fontFamilies.medium}
        /> */}
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.darkGray} />}
        />
      </SectionComponent>
      <SpaceComponent height={12} />
      <SectionComponent>
        <ButtonComponent
          text="Continue"
          type="primary"
          onPress={() => console.log('Login')}
          size={16}
          icon={<ArrowRight size={24} color={appColors.white} />}
          iconFlex="right"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default RecoveryPassword;
