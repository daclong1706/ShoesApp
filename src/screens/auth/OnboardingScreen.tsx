import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import Swiper from 'react-native-swiper';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/appColor';

const OnboardingScreen = ({navigation}: any) => {
  // const [index, setIndex] = useState(0);
  const swiperRef = useRef<Swiper>(null); // Định kiểu ref cho Swiper

  useEffect(() => {
    if (swiperRef.current) {
      // Đảm bảo Swiper đã sẵn sàng
      console.log('Swiper is ready');
    }
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true); // Gọi khi swiperRef đã được khởi tạo
    }
  };
  return (
    <View style={[globalStyles.container]}>
      <Swiper
        ref={swiperRef} // Gán ref cho Swiper
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
        {/* Onboard-1 */}
        <View>
          <Image
            source={require('../../assets/images/onboard-1.png')}
            style={{
              width: appInfo.sizes.WIDTH,
              height: appInfo.sizes.HEIGHT,
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              position: 'absolute',
              bottom: 20,
              right: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 50,
              backgroundColor: appColors.primary,
            }}>
            <TouchableOpacity onPress={handleNext}>
              <Text style={{color: appColors.white}}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Onboard-2 */}
        <View>
          <Image
            source={require('../../assets/images/onboard-2.png')}
            style={{
              width: appInfo.sizes.WIDTH,
              height: appInfo.sizes.HEIGHT,
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              position: 'absolute',
              bottom: 20,
              right: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 50,
              backgroundColor: appColors.primary,
            }}>
            <TouchableOpacity onPress={handleNext}>
              <Text style={{color: appColors.white}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Onboard-3 */}
        <View>
          <Image
            source={require('../../assets/images/onboard-3.png')}
            style={{
              width: appInfo.sizes.WIDTH,
              height: appInfo.sizes.HEIGHT,
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              position: 'absolute',
              bottom: 20,
              right: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 50,
              backgroundColor: appColors.primary,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{color: appColors.white}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>
    </View>
  );
};

export default OnboardingScreen;
