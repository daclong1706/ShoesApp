import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {uploadToCloudinary} from '../../apis/cloudinaryAPI';
import {
  ButtonComponent,
  ImagePicker,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {removeAuth} from '../../stores/reducers/authReducer';
import {
  fetchUser,
  selectUser,
  updateUser,
} from '../../stores/reducers/userSlice';
import ProfileOptions from './components/ProfileOptions';
import {LoadingModal} from '../../modals';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigation: any = useNavigation();
  const [userPhoto, setUserPhoto] = useState(user?.photo);
  const [loading, setLoading] = useState(false);
  console.log(userPhoto);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Hàm đăng xuất
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      dispatch(removeAuth());
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Xử lý upload ảnh lên Cloudinary
  const handleImageSelect = async (imagePath: string) => {
    setLoading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(imagePath);
      try {
        await dispatch(
          updateUser({
            photo: uploadedUrl,
          }),
        ).unwrap();

        Toast.show({
          type: 'success',
          text1: 'Cập nhật thành công',
          position: 'bottom',
          visibilityTime: 2000,
        });
        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi cập nhật',
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
      if (uploadedUrl) setUserPhoto(uploadedUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelected = async (val: ImageOrVideo) => {
    if (val.path) await handleImageSelect(val.path);
  };

  if (!user)
    return (
      <View style={styles.center}>
        <Text>No user data</Text>
      </View>
    );

  const error = console.error;
  console.error = (...args: any) => {
    if (/VirtualizedLists/.test(args[0])) return;
    error(...args);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Profile Info */}
      <View style={styles.center}>
        <TouchableOpacity>
          {user?.photo ? (
            <Image
              source={{uri: user?.photo || 'https://placehold.co/80x80'}}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, {backgroundColor: appColors.primary}]}>
              <TextComponent
                title
                size={22}
                text={
                  user?.name
                    ? user.name.trim().split(' ').slice(-1)[0][0].toUpperCase()
                    : ''
                }
                color={appColors.background}
              />
            </View>
          )}

          <ImagePicker
            onSelect={val =>
              val.type === 'url'
                ? handleImageSelect(val.value as string)
                : handleFileSelected(val.value as ImageOrVideo)
            }
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userInfo}>{user.email}</Text>
        <Text style={styles.userInfo}>{user.phoneNumber}</Text>
      </View>
      <SpaceComponent line />

      {/* Profile Options */}
      <ProfileOptions />

      {/* Logout Button */}
      <View style={{marginTop: 30}}>
        <ButtonComponent text="Logout" onPress={handleLogout} />
      </View>
      <LoadingModal visible={loading} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: appColors.background},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {fontSize: 20, fontWeight: 'bold'},
  userInfo: {fontSize: 14, color: '#888'},
});
