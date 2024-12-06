import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  ArrowRight2,
  Location,
  Notification,
  Profile,
  SecuritySafe,
  Setting,
  Setting2,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
      icon: (
        <FontAwesome5 name="user-cog" size={18} color={appColors.primary} />
      ),
    },
    {
      label: 'Địa chỉ',
      onPress: () => navigation.navigate('AddressList'),
      icon: (
        <MaterialIcons name="location-on" size={24} color={appColors.primary} />
      ),
    },
    {
      label: 'Cài đặt',
      onPress: () => navigation.navigate('SettingScreen'),
      icon: (
        <MaterialIcons name="settings" size={24} color={appColors.primary} />
      ),
    },
    {
      label: 'Đổi mật khẩu',
      onPress: () => navigation.navigate('ChangePasswordScreen'),
      icon: (
        <MaterialCommunityIcons
          name="key-change"
          size={24}
          color={appColors.primary}
        />
      ),
    },
    {
      label: 'Dark Mode',
      isSwitch: true,
      value: isDarkMode,
      onSwitchToggle: toggleDarkMode,
      icon: (
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={24}
          color={appColors.primary}
        />
      ),
    },
    {
      label: 'Chính sách bảo mật',
      onPress: () => navigation.navigate('PrivacyPolicyScreen'),
      icon: (
        <MaterialCommunityIcons
          name="security"
          size={24}
          color={appColors.primary}
        />
      ),
    },
    {
      label: 'Trung tâm hỗ trợ',
      onPress: () => {},
      icon: (
        <MaterialIcons
          name="support-agent"
          size={24}
          color={appColors.primary}
        />
      ),
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
            <ArrowRight2 size={24} color={appColors.primary} />
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
    fontSize: 16,
    marginLeft: 6,
    color: appColors.text,
    fontFamily: fontFamilies.regular,
  },
});
