import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {appColors} from '../../constants/appColor';
import {ButtonComponent, InputComponent} from '../../components';
import ContaineProfile from './components/ContainerProfile';
import {updatePassword} from '../../stores/reducers/userSlice';
import {useAppDispatch} from '../../stores/hook';

const ChangePasswordScreen = () => {
  const dispatch = useAppDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới không khớp.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    dispatch(updatePassword({currentPassword, newPassword}));
  };

  return (
    <ContaineProfile title="Đổi mật khẩu">
      <View style={styles.container}>
        <InputComponent
          isPassword
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Mật khẩu hiện tại"
        />
        <InputComponent
          isPassword
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Mật khẩu mới"
        />
        <InputComponent
          isPassword
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Xác nhận mật khẩu mới"
        />

        <ButtonComponent
          type="primary"
          onPress={handleChangePassword}
          text={'Đổi Mật Khẩu'}
          styles={{marginTop: 20}}
        />
      </View>
    </ContaineProfile>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: appColors.background,
  },
});

export default ChangePasswordScreen;
