import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TabBarBottom} from '../components';
import {CartScreen} from '../screens';
import FavoriteNavigator from './FavoriteNavigator';
import HomeNavigator from './HomeNavigator';
import NotificationNavigator from './NotificationNavigator';
import ProfileNavigator from './ProfileNavigator';
import DrawerNavigator from './DrawerNavigator';
import EventNavigator from './EventNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => {
        // Kiểm tra xem màn hình hiện tại có phải là ProductDetail không
        const routeName =
          getFocusedRouteNameFromRoute(
            props.state?.routes[props.state.index],
          ) || 'Home';
        const hideTabBar =
          routeName === 'ProductDetail' || routeName === 'ReviewScreen';
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
