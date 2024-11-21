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
import {
  ButtonComponent,
  RowComponent,
  TextComponent,
} from '../../../components';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  buttonText?: string;
  isButton?: boolean;
  onPress?: () => void;
}

const ContainerCart = (props: Props) => {
  const {
    isImageBackground,
    isScroll,
    children,
    title,
    buttonText,
    isButton,
    onPress,
  } = props;

  const navigation: any = useNavigation();

  const headerComponent = () => {
    return (
      <>
        <View style={{flex: 1, paddingTop: 10}}>
          <RowComponent
            styles={{
              paddingHorizontal: 26,
              paddingTop: 16,
              minWidth: 48,
              minHeight: 48,
            }}>
            <RowComponent>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[{marginRight: 12}]}>
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
                size={18}
                styles={{textTransform: 'capitalize'}}
              />
            </View>
          </RowComponent>

          {returnContainer}
        </View>

        {/* Nút "Thanh toán" luôn hiển thị ở dưới cùng */}
        {isButton ?? (
          <View style={styles.checkoutButtonContainer}>
            <ButtonComponent
              onPress={onPress}
              text={buttonText}
              type="primary"
            />
          </View>
        )}
      </>
    );
  };

  const returnContainer = isScroll ? (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{marginBottom: 100}}>
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
  checkoutButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -10}, // Bóng đổ hướng lên trên
    shadowOpacity: 0.2, // Tăng độ đậm của bóng cho rõ hơn
    shadowRadius: 10,
    elevation: 15, // Đảm bảo bóng đổ rõ trên Android
    zIndex: 10, // Đảm bảo thành phần này nằm trên các thành phần khác
  },
});

export default ContainerCart;
