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
    // Kiểm tra lỗi và bỏ qua thông báo "Invalid email or password."
    if (
      error.response &&
      (error.response.data.message === 'Invalid email or password.' ||
        error.response.data.message === 'Email not found.' ||
        error.response.data.message ===
          'Email is already in use. Try logging in instead.' ||
        error.response.data.data.message === 'Current password is incorrect.')
    ) {
      // Bỏ qua không log lỗi này ra console
      return Promise.reject(error); // Trả lỗi mà không log
    }

    // Log lỗi nếu không phải là lỗi "Invalid email or password."
    console.error(
      `Error in axios response:`,
      error.response?.data || error.message,
    );
    return Promise.reject(error); // Trả lỗi về để catch xử lý ở ngoài
  },
);

export default axiosClient;
