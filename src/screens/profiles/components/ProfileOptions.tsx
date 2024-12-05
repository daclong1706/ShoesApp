import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  ArrowRight2,
  Location,
  Notification,
  Profile,
  SecuritySafe,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RowComponent} from '../../../components';
import {appColors} from '../../../constants/appColor';
import {fontFamilies} from '../../../constants/fontFamilies';

const ProfileOptions = () => {
  const navigation: any = useNavigation();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchDarkMode = async () => {
      const storedMode = await AsyncStorage.getItem('darkMode');
      if (storedMode !== null) setIsDarkMode(storedMode === 'true');
    };
    fetchDarkMode();
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', newMode.toString());
  };

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
  return (
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
              <Switch value={item.value} onValueChange={item.onSwitchToggle} />
            )}
            <ArrowRight2 size={24} color={appColors.gray} />
          </RowComponent>
        </TouchableOpacity>
      )}
    />
  );
};

export default ProfileOptions;

const styles = StyleSheet.create({
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 6,
    color: appColors.text,
    fontFamily: fontFamilies.medium,
  },
});
