import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';
import {appInfo} from '../constants/appInfos';

interface Props {
  imageSource: ImageSourcePropType;
  buttonText: string;
  onPress?: () => void;
}

const OnboardingSlide = (props: Props) => {
  const {imageSource, buttonText, onPress} = props;
  return (
    <View>
      <Image
        source={imageSource}
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
          bottom: appInfo.sizes.HEIGHT * 0.05,
          right: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 50,
          backgroundColor: appColors.primary,
        }}>
        <TouchableOpacity onPress={onPress}>
          <TextComponent
            text={buttonText}
            color={appColors.white}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingSlide;
