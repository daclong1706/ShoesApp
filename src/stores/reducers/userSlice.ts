import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import userAPI from '../../apis/userAPI';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

// Async Thunks cho các thao tác API

// Lấy thông tin người dùng
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await userAPI.getUser();
  console.log('response: ', response);
  return response.data.user;
});

// Cập nhật thông tin người dùng
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<User>) => {
    const response = await userAPI.updateUser(userData);
    return response.data.user;
  },
);

// Cập nhật mật khẩu người dùng
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
    return;
  },
);

// Xóa tài khoản người dùng
export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
  await userAPI.deleteUser();
  return;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Lấy thông tin người dùng
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user';
      })

      // Cập nhật thông tin người dùng
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })

      // Cập nhật mật khẩu người dùng
      .addCase(updatePassword.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update password';
      })

      // Xóa tài khoản người dùng
      .addCase(deleteUser.fulfilled, state => {
        state.user = null;
      });
  },
});

// Export các actions và selectors
export const {resetUser} = userSlice.actions;
export const userReducer = userSlice.reducer;

// Selector
export const selectUser = (state: RootState) => state.userReducer.user;
export const selectUserStatus = (state: RootState) => state.userReducer.status;
export const selectUserError = (state: RootState) => state.userReducer.error;
