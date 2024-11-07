import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppRouter from './src/navigators/AppRouter';
import store from './src/stores/store';
import Toast from 'react-native-toast-message';
import toastConfig from './src/constants/toastConfig';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <NavigationContainer>
        <AppRouter />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
