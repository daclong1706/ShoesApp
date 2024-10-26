import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../stores/reducers/authReducer';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColor';
import {
  Calendar,
  Heart,
  Home,
  LogoutCurve,
  Notification,
  Profile,
  Setting2,
  ShoppingBag,
  TruckFast,
  User,
} from 'iconsax-react-native';
import RowComponent from './RowComponent';
import {fontFamilies} from '../constants/fontFamilies';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = ({navigation}: any) => {
  const user = useSelector(authSelector);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      dispatch(removeAuth());
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(user);
  const size = 24;
  const color = appColors.gray;
  const profileMenu = [
    {
      key: 'Profile',
      title: 'My Profile',
      icon: <Profile size={size} color={color} />,
    },
    {key: 'Home', title: 'Home', icon: <Home size={size} color={color} />},
    {
      key: 'Event',
      title: 'Events',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'Cart',
      title: 'Cart',
      icon: <ShoppingBag size={size} color={color} />,
    },
    {
      key: 'Favorite',
      title: 'Favorites',
      icon: <Heart size={size} color={color} />,
    },
    {
      key: 'Order',
      title: 'Orders',
      icon: <TruckFast size={size} color={color} />,
    },
    {
      key: 'Notification',
      title: 'Notifications',
      icon: <Notification size={size} color={color} />,
    },
    {
      key: 'Setting',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
  ];

  return (
    <View style={[style.container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Profile', {
            screen: 'ProfileScreen',
          });
        }}>
        {user.email ? (
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEm6PLJe9kcUX4umLQ5m_YJNu5mBlsPA5v8g&s',
            }}
            style={[style.avatar]}
          />
        ) : (
          <View style={[style.avatar, {backgroundColor: appColors.gray}]}>
            <TextComponent
              title
              size={22}
              text={
                user.name
                  ? user.name
                      .splipt(' ')
                      [user.name.splipt(' ').length - 1].substring(0, 1)
                  : ''
              }
            />
          </View>
        )}
        <TextComponent text={user.email} title size={18} />
      </TouchableOpacity>

      <FlatList
        data={profileMenu}
        style={{flex: 1, marginVertical: 20}}
        renderItem={({item, index}) => (
          <RowComponent
            styles={[style.listItem]}
            onPress={() => {
              console.log(item.key);
              navigation.closeDrawer();
            }}>
            {item.icon}
            <TextComponent
              text={item.title}
              size={16}
              font={fontFamilies.medium}
              styles={[style.listItemText]}
            />
          </RowComponent>
        )}
      />

      <RowComponent styles={[style.listItem]} onPress={handleLogout}>
        <LogoutCurve size={size} color={color} />
        <TextComponent
          text={'Sign Out'}
          size={16}
          font={fontFamilies.medium}
          styles={[style.listItemText]}
        />
      </RowComponent>
    </View>
  );
};

export default CustomDrawer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: StatusBar.currentHeight,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 100,
    marginBottom: 12,
  },
  listItem: {
    paddingVertical: 17,
    justifyContent: 'flex-start',
  },
  listItemText: {
    paddingLeft: 17,
  },
});
