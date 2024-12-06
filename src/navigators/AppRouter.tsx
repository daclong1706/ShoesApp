import React, {useEffect, useState} from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../stores/reducers/authReducer';
import {SplashScreen} from '../screens';

const AppRouter = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const res = await getItem();
    if (res) {
      dispatch(addAuth(JSON.parse(res)));
    }
  };

  // Kiểm tra auth và accesstoken
  const isAuthenticated = auth && auth.accesstoken;

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : isAuthenticated ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouter;
