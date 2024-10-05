import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {ReactNode} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
}

const ContainerComponent = (props: Props) => {
  const {isImageBackground, isScroll, title, children} = props;
  const returnContainer = isScroll ? (
    <ScrollView>{children}</ScrollView>
  ) : (
    <View>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/SplashScreen.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
