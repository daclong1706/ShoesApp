import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfo} from '../constants/appInfos';

// Tạo axios client cho PayPal
const paypalAxiosClient = axios.create({
  baseURL: appInfo.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Thêm Access Token vào mỗi yêu cầu nếu có
paypalAxiosClient.interceptors.request.use(
  async config => {
    try {
      // Lấy accessToken từ AsyncStorage
      const auth = await AsyncStorage.getItem('auth');
      let accessToken;
      if (auth) {
        accessToken = JSON.parse(auth)?.accesstoken;
      }

      // Thêm accessToken vào header nếu có
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    } catch (error) {
      console.error('Error getting access token:', error);
      return config;
    }
  },
  error => Promise.reject(error),
);

// Response Interceptor: Trả về toàn bộ response để có thể truy cập cả status và data
paypalAxiosClient.interceptors.response.use(
  response => response, // Trả về toàn bộ response
  error => {
    console.error(
      `Error in axios response:`,
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export default paypalAxiosClient;
