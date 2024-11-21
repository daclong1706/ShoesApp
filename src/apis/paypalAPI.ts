import paypalAxiosClient from './paypalAxiosClient';

class PayPalAPI {
  // Tạo đơn hàng PayPal
  async createOrder(amount: string): Promise<{id: string; links: any[]}> {
    const response = await paypalAxiosClient.post('/paypal/create-order', {
      amount,
    });
    return response.data;
  }

  // Xác nhận đơn hàng PayPal
  async captureOrder(
    orderID: string,
  ): Promise<{status: string; message: string}> {
    const response = await paypalAxiosClient.post('/paypal/capture-order', {
      orderID,
    });
    return response.data;
  }

  // Hoàn tiền đơn hàng PayPal (nếu cần)
  async refundOrder(
    captureID: string,
  ): Promise<{status: string; message: string}> {
    const response = await paypalAxiosClient.post('/paypal/refund-order', {
      captureID,
    });
    return response.data;
  }
}

const paypalAPI = new PayPalAPI();
export default paypalAPI;
