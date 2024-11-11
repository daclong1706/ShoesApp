import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {fetchUser, selectUser} from '../../stores/reducers/userSlice';
import {removeAuth} from '../../stores/reducers/authReducer';
import {
  ButtonComponent,
  ImagePicker,
  RowComponent,
  SpaceComponent,
} from '../../components';
import {uploadToCloudinary} from '../../apis/cloudinaryAPI';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {
  ArrowRight2,
  Location,
  Notification,
  Profile,
  SecuritySafe,
} from 'iconsax-react-native';
import {appColors} from '../../constants/appColor';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigation: any = useNavigation();
  const [userPhoto, setUserPhoto] = useState(user?.photo ?? '');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Lấy trạng thái Dark Mode từ AsyncStorage
  useEffect(() => {
    const fetchDarkMode = async () => {
      const storedMode = await AsyncStorage.getItem('darkMode');
      if (storedMode !== null) setIsDarkMode(storedMode === 'true');
    };
    fetchDarkMode();
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', newMode.toString());
  };

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

  // Danh sách các tùy chọn profile
  const profileOptions = [
    {
      label: 'Sửa hồ sơ',
      onPress: () => navigation.navigate('EditProfile'),
      icon: <Profile size={24} color={appColors.gray} />,
    },
    {
      label: 'Địa chỉ',
      onPress: () => navigation.navigate('AddressList'),
      icon: <Location size={24} color={appColors.gray} />,
    },
    {
      label: 'Thông báo',
      onPress: () => navigation.navigate('NotificationSettings'),
      icon: <Notification size={24} color={appColors.gray} />,
    },
    {
      label: 'Đổi mật khẩu',
      onPress: () => navigation.navigate('ChangePasswordScreen'),
      icon: <SecuritySafe size={24} color={appColors.gray} />,
    },
    {
      label: 'Dark Mode',
      isSwitch: true,
      value: isDarkMode,
      onSwitchToggle: toggleDarkMode,
      icon: <Profile size={24} color={appColors.gray} />,
    },
    {
      label: 'Chính sách bảo mật',
      onPress: () => navigation.navigate('PrivacyPolicyScreen'),
      icon: <Profile size={24} color={appColors.gray} />,
    },
    {
      label: 'Trung tâm hỗ trợ',
      onPress: () => {},
      icon: <Profile size={24} color={appColors.gray} />,
    },
  ];

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
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Image
              source={{uri: userPhoto || 'https://placehold.co/80x80'}}
              style={styles.avatar}
            />
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
        <Text style={styles.userInfo}>{user.phone}</Text>
      </View>
      <SpaceComponent line />

      {/* Profile Options */}
      <FlatList
        data={profileOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.optionItem} onPress={item.onPress}>
            <RowComponent>
              {item.icon}
              <Text style={styles.optionText}>{item.label}</Text>
            </RowComponent>
            <RowComponent>
              {item.isSwitch && (
                <Switch
                  value={item.value}
                  onValueChange={item.onSwitchToggle}
                />
              )}
              <ArrowRight2 size={24} color={appColors.gray} />
            </RowComponent>
          </TouchableOpacity>
        )}
      />

      {/* Logout Button */}
      <View style={{marginTop: 30}}>
        <ButtonComponent text="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: appColors.background},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  avatar: {width: 80, height: 80, borderRadius: 40, marginBottom: 10},
  userName: {fontSize: 20, fontWeight: 'bold'},
  userInfo: {fontSize: 14, color: '#888'},
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {fontSize: 16, marginLeft: 6, color: appColors.text},
});
