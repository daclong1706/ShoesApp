import axios from 'axios';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfo} from '../constants/appInfos';

const axiosClient = axios.create({
  baseURL: appInfo.BASE_URL,
  paramsSerializer: params => queryString.stringify(params),
});

// Request Interceptor
axiosClient.interceptors.request.use(async config => {
  try {
    // Lấy accessToken từ AsyncStorage
    const auth = await AsyncStorage.getItem('auth');
    let accessToken;
    if (auth !== null) {
      accessToken = JSON.parse(auth)?.accesstoken;
    } else {
      console.log('Auth Value: Not found');
    }

    // Thêm accessToken vào header Authorization nếu có
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    config.headers.Accept = 'application/json';

    return config;
  } catch (error) {
    console.error('Error getting access token:', error);
    return config;
  }
});

// Response Interceptor
axiosClient.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    console.error(
      `Error in axios response:`,
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export default axiosClient;
