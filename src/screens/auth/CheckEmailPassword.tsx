import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {ArrowRight} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../stores/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckEmailPassword = ({navigation, route}: any) => {
  const {code, email} = route.params;

  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    let item = '';
    codeValues.forEach(val => {
      item += val;
    });
    setNewCode(item);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };

  const handleResendEmailCode = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');

    const api = '/forgotPassword';
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      setLimit(60);
      setCurrentCode(res.data.code);
      setIsLoading(false);

      console.log(res.data.code);
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not send code to email &{error}`);
    }
  };

  const handleResetPassword = async () => {
    console.log(newCode, currentCode);
    if (parseInt(newCode) !== parseInt(currentCode)) {
      setErrorMessage('Invalid code.');
    } else {
      setErrorMessage('');
      try {
        navigation.navigate('ResetPassword', {
          email,
        });
      } catch (error) {
        setErrorMessage('User has already exist.');
        console.log(`Can not create new user ${error}`);
      }
    }
  };

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
          text="Kiểm tra email của bạn"
          styles={{marginBottom: 12}}
        />
        <TextComponent
          text={`Chúng tôi đã gửi liên kết đặt lại mật khẩu đến ${email.replace(
            /.{1,7}./,
            (m: any) => '*'.repeat(m.length),
          )}, vui lòng nhập mã 4 chữ số được đề cập trong email`}
          color={appColors.coolGray}
          size={16}
          styles={{paddingHorizontal: 10, textAlign: 'center'}}
        />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="space-around">
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            value={codeValues[0]}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref2}
            value={codeValues[1]}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref3.current.focus();
              handleChangeCode(val, 1);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref3}
            value={codeValues[2]}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref4.current.focus();
              handleChangeCode(val, 2);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref4}
            value={codeValues[3]}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
          />
        </RowComponent>
      </SectionComponent>

      <SectionComponent styles={{marginTop: 32}}>
        <ButtonComponent
          disable={newCode.length !== 4}
          text="Xác minh"
          type="primary"
          onPress={handleResetPassword}
          size={18}
          icon={
            <View style={[globalStyles.iconContainer]}>
              <ArrowRight size={24} color={appColors.white} />
            </View>
          }
          iconFlex="right"
        />
      </SectionComponent>
      {errorMessage && (
        <SectionComponent>
          <TextComponent
            flex={0}
            styles={{textAlign: 'center'}}
            text={errorMessage}
            color={appColors.danger}
          />
        </SectionComponent>
      )}
      <SectionComponent styles={{marginTop: 32}}>
        {limit > 0 ? (
          <RowComponent justify="center">
            <TextComponent text="Gửi lại mã trong " />
            <TextComponent
              text={`${(limit - (limit % 60)) / 60}:${
                limit - (limit - (limit % 60))
              }`}
              color={appColors.primary}
            />
          </RowComponent>
        ) : (
          <RowComponent justify="center">
            <TextComponent text="Chưa nhận được email? " />
            <ButtonComponent
              type="link"
              text="Gửi lại"
              onPress={handleResendEmailCode}
            />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default CheckEmailPassword;

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
  },
});
