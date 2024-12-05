import axiosClient from './axiosClient';
import {User} from '../models/UserModel';

class UserAPI {
  async getUser(): Promise<{data: {user: User}}> {
    return await axiosClient.get('/user');
  }

  async updateUser(userData: Partial<User>): Promise<{data: {user: User}}> {
    console.log('axios');
    console.log(userData);
    return await axiosClient.put('/user', userData);
  }

  async updatePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<{message: string}> {
    try {
      const response = await axiosClient.put('/user/password', {
        currentPassword,
        newPassword,
      });

      // Giả sử API trả về thông báo thành công
      return response.data; // Trả về { message: 'Mật khẩu đã được thay đổi thành công' }
    } catch (error: any) {
      // Nếu có lỗi, bạn có thể throw lỗi ở đây
      throw new Error(error.response?.data?.message || 'Error-Password');
    }
  }

  async deleteUser(): Promise<{message: string}> {
    return await axiosClient.delete('/user');
  }
}

const userAPI = new UserAPI();
export default userAPI;
