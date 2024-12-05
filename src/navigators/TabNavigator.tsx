import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {TabBarBottom} from '../components';
import {CartScreen} from '../screens';
import FavoriteNavigator from './FavoriteNavigator';
import HomeNavigator from './HomeNavigator';
import EventNavigator from './EventNavigator';
import ProfileNavigator from './ProfileNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [hideTabBarHome, setHideTabBarHome] = useState(false);

  const shouldHideTabBar = (routeName: string) => {
    const hideTabBarScreens = [
      'ProductDetail',
      'ReviewScreen',
      'ProductScreen',
      'EventScreen',
      'EditProfile',
      'OrderDetails',
      'Notification',
      'PrivacyPolicyScreen',
      'Cart',
      'ChangePasswordScreen',
      'NotificationSettings',
      'SearchScreen',
      'DiscoverScreen',
    ];
    return hideTabBarScreens.includes(routeName);
  };

  return (
    <Tab.Navigator
      tabBar={props => {
        const routeName =
          getFocusedRouteNameFromRoute(
            props.state?.routes[props.state.index],
          ) || props.state?.routes[props.state.index]['name'];

        // Kiểm tra xem có nên ẩn tab bar hay không
        const hideTabBar = shouldHideTabBar(routeName) || hideTabBarHome;

        return <TabBarBottom {...props} hideTabBar={hideTabBar} />;
      }}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarStyle: {display: hideTabBarHome ? 'none' : 'flex'}, // Ẩn tab bar khi hideTabBar = true
        }}
      />
      <Tab.Screen name="Event" component={EventNavigator} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favorite" component={FavoriteNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
