import axios from 'axios';

const getExchangeRate = async (): Promise<number> => {
  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/USD`,
    );
    const rate = response.data.rates.VND;
    console.log('Current USD to VND rate:', rate);
    return rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return 25400; // Giá trị dự phòng nếu không lấy được từ API
  }
};

export default getExchangeRate;
