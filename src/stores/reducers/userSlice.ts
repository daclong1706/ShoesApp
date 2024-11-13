import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import userAPI from '../../apis/userAPI';
import {User} from '../../models/UserModel';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

// Lấy thông tin người dùng
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await userAPI.getUser();
  const user = response.data.user;
  return user;
});

// Cập nhật thông tin người dùng
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<User>) => {
    const response = await userAPI.updateUser(userData);
    console.log(response.data.user);
    return response.data.user;
  },
);

// Cập nhật mật khẩu
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    await userAPI.updatePassword(currentPassword, newPassword);
  },
);

// Xóa tài khoản
export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
  await userAPI.deleteUser();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.user = null;
      });
  },
});

export const {resetUser} = userSlice.actions;
export const userReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.userReducer.user;

export default userSlice;
