import {
  ShoppingBag,
  Heart,
  Home,
  Notification,
  Profile,
  Calendar,
} from 'iconsax-react-native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {appColors} from '../constants/appColor';
import {globalStyles} from '../styles/globalStyles';
import CircleComponent from './CircleComponent';

const TabBarBottom = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.container}>
      <Svg width={412} height={114} viewBox={`0 0 472 90`} style={styles.svg}>
        <Path
          d="M156.212 24.5C88.4622 25.7 27.8416 11.3333 0 4V110H471V4C435.62 23.5 347.841 24 321.26 24C294.68 24 295.937 28 290.318 47.5C284.699 67 281.328 86 236.938 86C192.549 86 188.285 67.0298 184.512 54.5C180.739 41.9702 184.512 24.5 156.212 24.5Z"
          fill="white"
        />
      </Svg>

      <View style={styles.tabContainer}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconColor = isFocused ? appColors.primary : appColors.gray;

          // Icon cho mỗi tab
          let IconComponent;
          if (route.name === 'Home') {
            IconComponent = <Home size={24} color={iconColor} />;
          } else if (route.name === 'Favorite') {
            IconComponent = <Heart size={24} color={iconColor} />;
          } else if (route.name === 'Event') {
            IconComponent = <Calendar size={24} color={iconColor} />;
          } else if (route.name === 'Profile') {
            IconComponent = <Profile size={24} color={iconColor} />;
          } else if (route.name === 'Cart') {
            IconComponent = (
              <CircleComponent size={75}>
                <ShoppingBag size={30} color="white" />
              </CircleComponent>
              // <View
              //   style={[
              //     {
              //       position: 'absolute',
              //       bottom: 5,
              //       width: 75,
              //       height: 75,
              //       borderRadius: 37.5,
              //       backgroundColor: appColors.primary,
              //       justifyContent: 'center',
              //       alignItems: 'center',
              //       shadowColor: appColors.primary,
              //       shadowOpacity: 0.4,
              //       shadowOffset: {width: 0, height: 0},
              //       shadowRadius: 15,
              //       elevation: 10,
              //     },
              //   ]}>
              //   <ShoppingBag size={30} color="white" />
              // </View>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}>
              {IconComponent}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'transparent',
  },
  svg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  centerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: 70,
    backgroundColor: 'transparent',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBarBottom;
