import React from 'react';
import {Button, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../stores/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../constants/appColor';
import {CircleComponent, RowComponent, TextComponent} from '../../components';
import {Location, Menu, ShoppingBag} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const HomeScreen = ({navigation}: any) => {
  // const dispatch = useDispatch();

  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.removeItem('auth');
  //     dispatch(removeAuth());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F8F9FA',
      }}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          // backgroundColor: appColors.primary,
          height: 179,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          padding: StatusBar.currentHeight,
        }}>
        <RowComponent justify="center">
          <CircleComponent
            styles={{backgroundColor: appColors.white}}
            onPress={() => navigation.openDrawer()}>
            <Menu size={24} color={appColors.black} />
          </CircleComponent>
          <View style={[{flex: 1, alignItems: 'center'}]}>
            <TextComponent
              text="Store location"
              color={appColors.gray}
              size={12}
              font={fontFamilies.medium}
            />
            <RowComponent>
              {/* <Location size={24} color={appColors.danger} /> */}
              <FontAwesome6
                name="location-dot"
                size={14}
                color={appColors.danger}
              />
              <TextComponent
                text=" Mondolibug, Sylhet"
                font={fontFamilies.semiBold}
              />
            </RowComponent>
          </View>
          <CircleComponent styles={{backgroundColor: appColors.white}}>
            <ShoppingBag size={24} color={appColors.black} />
            <View
              style={{
                backgroundColor: appColors.danger,
                width: 8,
                height: 8,
                borderRadius: 4,
                position: 'absolute',
                top: 1.5,
                right: 1.5,
              }}
            />
          </CircleComponent>
        </RowComponent>
      </View>
    </View>
  );
};

export default HomeScreen;
