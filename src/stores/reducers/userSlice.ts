import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import userAPI from '../../apis/userAPI';
import {User} from '../../models/UserModel';

interface UserState {
  user: User | null;
  message: string | null; // Lưu thông báo thành công hoặc lỗi
}

const initialState: UserState = {
  user: null,
  message: null,
};

// Lấy thông tin người dùng
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await userAPI.getUser();
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

// Cập nhật mật khẩu
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (
    {
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    },
    {rejectWithValue},
  ) => {
    try {
      // Gọi API để cập nhật mật khẩu
      const response = await userAPI.updatePassword(
        currentPassword,
        newPassword,
      );
      return response; // Trả về thông điệp thành công
    } catch (error: any) {
      // Nếu có lỗi, trả về thông báo lỗi
      return rejectWithValue(error.message || 'Error-Password');
    }
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
      state.message = null;
    },
  },
  extraReducers: builder => {
    builder
      // Lấy thông tin người dùng
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.message = null; // Reset message khi lấy thông tin thành công
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.message = null;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.user = null;
        state.message = 'Tài khoản đã được xóa.';
      })
      // Xử lý khi updatePassword thành công
      .addCase(
        updatePassword.fulfilled,
        (state, action: PayloadAction<{message: string}>) => {
          state.message = action.payload.message; // Lưu thông báo thành công
        },
      )
      // Xử lý khi updatePassword thất bại
      .addCase(updatePassword.rejected, (state, action) => {
        state.message = action.payload as string; // Lưu thông báo lỗi
      });
  },
});

export const {resetUser} = userSlice.actions;
export const userReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.userReducer.user;
export const selectUserMessage = (state: RootState) =>
  state.userReducer.message;

export default userSlice;
