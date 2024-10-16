import React, {useEffect} from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../stores/reducers/authReducer';

const AppRouter = () => {
  const {getItem} = useAsyncStorage('auth');

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
  });

  const checkLogin = async () => {
    const res = await getItem();

    res && dispatch(addAuth(JSON.parse(res)));
  };

  return <>{auth.accesstoken ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppRouter;
