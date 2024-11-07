import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {OnboardingSlide} from '../../components';
import {appColors} from '../../constants/appColor';
import {globalStyles} from '../../styles/globalStyles';

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
        dotColor={appColors.primaryPastel}
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
          backgroundColor: appColors.primaryPastel,
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
