import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {appColors} from '../../constants/appColor';
import {ButtonComponent, InputComponent} from '../../components';
import ContaineProfile from './components/ContainerProfile';
import {updatePassword} from '../../stores/reducers/userSlice';
import {useAppDispatch} from '../../stores/hook';
import {AddItemModal, LoadingModal} from '../../modals';
import Toast from 'react-native-toast-message';

const ChangePasswordScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showToast = (message: any) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top',
      visibilityTime: 2000,
    });
  };

  const handleChangePassword = async () => {
    setIsLoading(true);

    try {
      // Kiểm tra các trường thông tin
      if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('Vui lòng điền đầy đủ thông tin.');
        setIsLoading(false);
        return;
      }

      // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
      if (newPassword !== confirmPassword) {
        showToast('Mật khẩu mới không khớp.');
        setIsLoading(false);
        return;
      }

      // Kiểm tra mật khẩu cũ không trùng với mật khẩu mới
      if (currentPassword === newPassword) {
        showToast('Mật khẩu mới không được trùng với mật khẩu cũ.');
        setIsLoading(false);
        return;
      }

      // Dispatch action để cập nhật mật khẩu
      const res = await dispatch(
        updatePassword({currentPassword, newPassword}),
      );
      if (res.payload === 'Error-Password') {
        showToast('Mật khẩu hiện tại không đúng.');
      } else {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Lỗi khi thay đổi mật khẩu:', error);
      showToast('Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại.');
    } finally {
      setIsLoading(false); // Đảm bảo rằng setIsLoading luôn được gọi
    }
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
      <LoadingModal visible={isLoading} />
      <AddItemModal visible={visible} mess="Đổi mật khẩu thành công" />
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
