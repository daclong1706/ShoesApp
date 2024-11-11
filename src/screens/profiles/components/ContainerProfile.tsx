import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, ArrowLeft2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {appColors} from '../../../constants/appColor';
import {fontFamilies} from '../../../constants/fontFamilies';
import {RowComponent, TextComponent} from '../../../components';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
}

const ContaineProfile = (props: Props) => {
  const {isImageBackground, isScroll, children, title} = props;

  const navigation: any = useNavigation();

  const headerComponent = () => {
    return (
      <View style={{flex: 1, paddingTop: 10}}>
        <RowComponent
          styles={{
            paddingHorizontal: 26,
            paddingVertical: 16,
            minWidth: 48,
            minHeight: 48,
          }}>
          <RowComponent>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.button, {marginRight: 12}]}>
              <ArrowLeft size={24} color={appColors.text} />
            </TouchableOpacity>
          </RowComponent>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <TextComponent
              text={title}
              font={fontFamilies.medium}
              size={16}
              styles={{textTransform: 'capitalize'}}
            />
          </View>
        </RowComponent>

        {returnContainer}
      </View>
    );
  };

  const returnContainer = isScroll ? (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.flexContainer}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={require('../../../assets/images/SplashScreen.png')}
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

export default ContaineProfile;
