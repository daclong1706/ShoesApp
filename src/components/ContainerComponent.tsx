import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, ArrowLeft2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
  onPress?: () => void;
}

const ContainerComponent = (props: Props) => {
  const {isImageBackground, isScroll, children, back, title, onPress} = props;

  const navigation: any = useNavigation();

  const headerComponent = () => {
    return (
      <View style={{flex: 1, paddingTop: 10}}>
        {(title || back) && (
          <RowComponent
            styles={{
              paddingHorizontal: 26,
              paddingVertical: 16,
              minWidth: 48,
              minHeight: 48,
            }}>
            {back && (
              <RowComponent>
                <TouchableOpacity
                  onPress={onPress ? onPress : () => navigation.goBack()}
                  style={[styles.button, {marginRight: 12}]}>
                  <ArrowLeft size={24} color={appColors.text} />
                </TouchableOpacity>
              </RowComponent>
            )}
            {title && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextComponent
                  text={title}
                  font={fontFamilies.medium}
                  size={back ? 16 : 20}
                  styles={{left: back ? -32 : 0, textTransform: 'capitalize'}}
                />
              </View>
            )}
          </RowComponent>
        )}

        {returnContainer}
      </View>
    );
  };

  const returnContainer = isScroll ? (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator>
      {children}
    </ScrollView>
  ) : (
    <View style={styles.flexContainer}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/SplashScreen.png')}
      style={styles.flexContainer}
      imageStyle={styles.flexContainer}>
      <SafeAreaView style={styles.flexContainer}>
        {headerComponent()}
      </SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={[globalStyles.container]}>{headerComponent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  button: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 44,
    flexDirection: 'row',
  },
});

export default ContainerComponent;
