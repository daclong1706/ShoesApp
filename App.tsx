import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppRouter from './src/navigators/AppRouter';
import {SplashScreen} from './src/screens';
import store from './src/stores/store';

function App(): React.JSX.Element {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Provider store={store}>
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        )}
      </Provider>
    </>
  );
}

export default App;
