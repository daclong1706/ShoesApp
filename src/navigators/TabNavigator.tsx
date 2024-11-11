import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TabBarBottom} from '../components';
import {CartScreen} from '../screens';
import FavoriteNavigator from './FavoriteNavigator';
import HomeNavigator from './HomeNavigator';
import EventNavigator from './EventNavigator';
import ProfileNavigator from './ProfileNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const shouldHideTabBar = (routeName: string) => {
    // Danh sách các màn hình mà bạn muốn ẩn tab bar
    const hideTabBarScreens = [
      'ProductDetail',
      'ReviewScreen',
      'ProductScreen',
      'EventScreen',
      'EditProfile',
      'OrderDetails',
      'Notification',
      'CartScreen',
    ];
    return hideTabBarScreens.includes(routeName);
  };

  return (
    <Tab.Navigator
      tabBar={props => {
        // Lấy routeName của màn hình hiện tại
        const routeName =
          getFocusedRouteNameFromRoute(
            props.state?.routes[props.state.index],
          ) || 'Home';

        // Kiểm tra xem có nên ẩn tab bar hay không
        const hideTabBar = shouldHideTabBar(routeName);

        return <TabBarBottom {...props} hideTabBar={hideTabBar} />;
      }}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Event" component={EventNavigator} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{tabBarShowLabel: false}}
      />
      <Tab.Screen name="Favorite" component={FavoriteNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
