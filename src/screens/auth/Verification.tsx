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
import {AccountModal, LoadingModal} from '../../modals';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../stores/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = ({navigation, route}: any) => {
  const {code, email, password, username} = route.params;

  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountModalVisible, setAccountModalVisible] = useState(false);

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

  const handleResendVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');

    const api = '/verification';
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
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not send verification code &{error}`);
    }
  };

  const handleVerification = async () => {
    if (parseInt(newCode) !== parseInt(currentCode)) {
      setErrorMessage('Mã không hợp lệ.');
    } else {
      setErrorMessage('');
      const api = '/register';
      const data = {
        email,
        password,
        username: username ?? '',
      };
      setIsLoading(true);
      try {
        // Đăng ký tài khoản
        const res: any = await authenticationAPI.HandleAuthentication(
          api,
          data,
          'post',
        );

        // Đăng nhập ngay sau khi tạo tài khoản
        const loginRes = await authenticationAPI.HandleAuthentication(
          '/login',
          {email, password},
          'post',
        );
        setIsLoading(false);

        setAccountModalVisible(true); // Hiển thị modal sau 2 giây

        // Trì hoãn hiển thị modal sau 2 giây

        // Sau khi modal hiển thị, điều hướng vào trang chủ
        setTimeout(() => {
          // Lưu thông tin vào AsyncStorage sau khi đăng nhập
          setAccountModalVisible(false);
          AsyncStorage.setItem('auth', JSON.stringify(loginRes.data));
          dispatch(addAuth(loginRes.data));
          // Điều hướng tới MainNavigator sau khi modal đã hiển thị
        }, 2500); // Chờ 2.5 giây trước khi chuyển hướng
      } catch (error) {
        setErrorMessage('Tài khoản đã tồn tại.');
        console.log(`Không thể tạo tài khoản mới: ${error}`);
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
        <TextComponent title text="Xác minh" styles={{marginBottom: 12}} />
        <TextComponent
          text={`Vui lòng kiểm tra email ${email.replace(/.{1,7}./, (m: any) =>
            '*'.repeat(m.length),
          )} để lấy mã xác minh`}
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
          text="Tiếp tục"
          type="primary"
          onPress={handleVerification}
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
            <ButtonComponent
              type="link"
              text="Gửi lại email xác minh"
              onPress={handleResendVerification}
            />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
      <AccountModal visible={accountModalVisible} />
    </ContainerComponent>
  );
};

export default Verification;

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
