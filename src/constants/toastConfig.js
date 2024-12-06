// toastConfig.ts
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import {fontFamilies} from './fontFamilies';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green', backgroundColor: 'rgba(0, 0, 0, 0.9)'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 12,
        fontFamily: fontFamilies.regular,
        color: 'white',
      }}
      text2Style={{
        fontSize: 13,
        color: 'gray',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red', backgroundColor: 'rgba(0, 0, 0, 0.9)'}}
      text1Style={{
        fontSize: 12,
        fontFamily: fontFamilies.regular,
        color: 'white',
      }}
      // text2Style={{
      //   fontSize: 13,
      //   color: 'gray',
      // }}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#3498db',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 12,
        fontFamily: fontFamilies.regular,
        color: 'white',
      }}
      // text2Style={{
      //   fontSize: 13,
      //   color: 'gray',
      // }}
    />
  ),
};

export default toastConfig;
