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
    return await axiosClient.put('/user/password', {
      currentPassword,
      newPassword,
    });
  }

  async deleteUser(): Promise<{message: string}> {
    return await axiosClient.delete('/user');
  }
}

const userAPI = new UserAPI();
export default userAPI;
