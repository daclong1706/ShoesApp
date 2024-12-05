import axiosClient from './axiosClient';

class AddressAPI {
  // Lấy danh sách tất cả các địa chỉ của người dùng
  getAddresses = async () => {
    try {
      const response = await axiosClient.get('/address');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Thêm một địa chỉ mới
  createAddress = async (address: any) => {
    try {
      const response = await axiosClient.post('/address', address);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Cập nhật một địa chỉ (chỉnh sửa)
  updateAddress = async (addressId: any, address: any) => {
    try {
      const response = await axiosClient.put(`/address/${addressId}`, address);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Lấy thông tin chi tiết của một địa chỉ
  getAddressById = async (addressId: any) => {
    try {
      const response = await axiosClient.get(`/address/${addressId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Đặt địa chỉ làm mặc định
  setDefaultAddress = async (addressId: any) => {
    try {
      const response = await axiosClient.put(
        `/address/set-default/${addressId}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Xóa một địa chỉ
  deleteAddress = async (addressId: any) => {
    try {
      const response = await axiosClient.delete(`/address/${addressId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

const addressAPI = new AddressAPI();
export default addressAPI;
