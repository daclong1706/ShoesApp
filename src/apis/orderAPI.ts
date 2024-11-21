import axiosClient from './axiosClient';

class OrderAPI {
  // Lấy danh sách tất cả các đơn hàng của người dùng
  getOrders = async () => {
    return await axiosClient.get('/orders');
  };

  // Tạo một đơn hàng mới
  createOrder = async (shippingAddress: any, paymentDetails: any) => {
    return await axiosClient.post('/orders', {
      shippingAddress,
      paymentDetails,
    });
  };

  // Lấy thông tin chi tiết của một đơn hàng
  getOrderById = async (orderId: string) => {
    return await axiosClient.get(`/orders/${orderId}`);
  };

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus = async (orderId: string, status: string) => {
    return await axiosClient.patch(`/orders/${orderId}`, {status});
  };
}

const orderAPI = new OrderAPI();
export default orderAPI;
