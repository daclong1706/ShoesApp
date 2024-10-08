import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import Swiper from 'react-native-swiper';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/appColor';
import {
  ButtonComponent,
  OnboardingSlide,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';

const OnboardingScreen = ({navigation}: any) => {
  const swiperRef = useRef<Swiper>(null);

  useEffect(() => {
    if (swiperRef.current) {
      console.log('Swiper is ready');
    }
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        showsButtons={false}
        dotColor={appColors.primary2}
        activeDotColor={appColors.primary}
        paginationStyle={{
          bottom: 40,
          justifyContent: 'flex-start',
          paddingLeft: 30,
        }}
        dotStyle={{
          width: 10,
          height: 6,
          borderRadius: 4,
          backgroundColor: appColors.primary2,
        }}
        activeDotStyle={{
          width: 32,
          height: 6,
          borderRadius: 4,
          backgroundColor: appColors.primary,
        }}>
        <OnboardingSlide
          imageSource={require('../../assets/images/onboard-1.png')}
          buttonText="Get Started"
          onPress={handleNext}
        />
        <OnboardingSlide
          imageSource={require('../../assets/images/onboard-2.png')}
          buttonText="Next"
          onPress={handleNext}
        />
        <OnboardingSlide
          imageSource={require('../../assets/images/onboard-3.png')}
          buttonText="Next"
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </Swiper>
    </View>
  );
};

export default OnboardingScreen;
