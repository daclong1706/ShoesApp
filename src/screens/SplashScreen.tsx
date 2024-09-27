import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {appInfo} from '../constants/appInfos';
import {SpaceComponent} from '../components';
import {appColors} from '../constants/appColor';

const SplashScreen = () => {
  return (
    <View
      // source={require('../assets/images/SplashScreen.png')} ImageBackground thay View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      {/* imageStyle={{flex: 1}}> */}
      <Image
        source={require('../assets/images/nike.png')}
        style={{
          width: appInfo.sizes.WIDTH * 0.4,
          resizeMode: 'contain',
        }}
        tintColor="#fff"
      />
      <SpaceComponent height={0} />
      <ActivityIndicator color={appColors.gray} size={25} />
    </View>
  );
};

export default SplashScreen;
