import React, {useEffect, useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {SplashScreen} from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      )}
    </>
  );
}

export default App;
