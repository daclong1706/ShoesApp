import axios from 'axios';
import {appInfo} from '../constants/appInfos';

const stripeAxiosClient = axios.create({
  baseURL: appInfo.BASE_URL, // Đảm bảo BASE_URL trỏ đến server của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

export default stripeAxiosClient;
