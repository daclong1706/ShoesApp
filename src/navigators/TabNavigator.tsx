import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TabBarBottom} from '../components';
import {CartScreen} from '../screens';
import FavoriteNavigator from './FavoriteNavigator';
import HomeNavigator from './HomeNavigator';
import NotificationNavigator from './NotificationNavigator';
import ProfileNavigator from './ProfileNavigator';
import DrawerNavigator from './DrawerNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBarBottom {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Favorite" component={FavoriteNavigator} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{tabBarShowLabel: false}}
      />
      <Tab.Screen name="Notification" component={NotificationNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
