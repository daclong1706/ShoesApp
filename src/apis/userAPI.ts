import axiosClient from './axiosClient';

class UserAPI {
  // Lấy thông tin người dùng hiện tại
  getUser = async () => {
    return await axiosClient.get('/user');
  };

  // Cập nhật thông tin người dùng
  updateUser = async (userData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }) => {
    return await axiosClient.put('/user', userData);
  };

  // Xóa tài khoản người dùng
  deleteUser = async () => {
    return await axiosClient.delete('/user');
  };

  // Cập nhật mật khẩu người dùng
  updatePassword = async (currentPassword: string, newPassword: string) => {
    return await axiosClient.patch('/user/password', {
      currentPassword,
      newPassword,
    });
  };

  // Lấy danh sách đơn hàng của người dùng
  getUserOrders = async () => {
    return await axiosClient.get('/user/orders');
  };
}

const userAPI = new UserAPI();
export default userAPI;
