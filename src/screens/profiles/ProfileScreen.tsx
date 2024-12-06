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
  FooterComponent,
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
import {Loading, LoadingModal} from '../../modals';
import {fontFamilies} from '../../constants/fontFamilies';
import {LogoutCurve} from 'iconsax-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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
      await GoogleSignin.signOut();
      dispatch(removeAuth());
    } catch (error) {
      console.log(error);
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
        <Loading />
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
        <View style={styles.avatar}>
          {user?.photo ? (
            <Image
              source={{uri: user?.photo || 'https://placehold.co/80x80'}}
              style={styles.image}
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
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userInfo}>{user.email}</Text>
        <Text style={styles.userInfo}>{user.phoneNumber}</Text>
      </View>
      <SpaceComponent line />

      {/* Profile Options */}
      <ProfileOptions />

      {/* Logout Button */}
      <View style={{marginTop: 30}}>
        <ButtonComponent
          text="Logout"
          onPress={handleLogout}
          type="primary"
          // color={appColors.danger}
          icon={<LogoutCurve size={24} color={appColors.white} />}
          iconFlex="left"
        />
      </View>
      <LoadingModal visible={loading} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: appColors.background},
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    position: 'relative',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  userName: {
    marginTop: 12,
    fontSize: 20,
    fontFamily: fontFamilies.bold,
    color: appColors.text,
  },
  userInfo: {
    fontSize: 14,
    color: '#888',
    fontFamily: fontFamilies.semiMedium,
  },
});
