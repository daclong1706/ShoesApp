import axiosClient from './axiosClient';

class OrderAPI {
  // Lấy danh sách tất cả các đơn hàng của người dùng
  getOrders = async () => {
    try {
      const response = await axiosClient.get('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Tạo một đơn hàng mới
  createOrder = async (shippingAddress: any, paymentDetails: any) => {
    try {
      const response = await axiosClient.post('/orders', {
        shippingAddress,
        paymentDetails,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Lấy thông tin chi tiết của một đơn hàng
  getOrderById = async (orderId: any) => {
    try {
      const response = await axiosClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus = async (orderId: any, status: any) => {
    try {
      const response = await axiosClient.patch(`/orders/${orderId}`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Hủy đơn hàng
  cancelOrder = async (orderId: any) => {
    try {
      const response = await axiosClient.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

const orderAPI = new OrderAPI();
export default orderAPI;
