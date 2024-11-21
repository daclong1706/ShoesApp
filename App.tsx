import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import AppRouter from './src/navigators/AppRouter';
import store from './src/stores/store';
import Toast from 'react-native-toast-message';
import toastConfig from './src/constants/toastConfig';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51QL13vBGzsBf3YySGgAaaRWqwvHrSywxpGgkBsmGppcMeIgYuceGfuTHZGS3Sjd45khUUryN5Lf56eYLkKkkPcSj00OWOtGlCk">
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <AppRouter />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}

export default App;
