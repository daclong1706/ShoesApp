import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import userAPI from '../../apis/userAPI';

interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address[];
  photo?: string;
  role: 'user' | 'admin';
}

interface UserState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
};

// Async Thunks cho các thao tác API

// Lấy thông tin người dùng
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, {rejectWithValue}) => {
    try {
      const response = await userAPI.getUser();
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user',
      );
    }
  },
);

// Cập nhật thông tin người dùng
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<User>, {rejectWithValue}) => {
    try {
      const response = await userAPI.updateUser(userData);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update user',
      );
    }
  },
);

// Cập nhật mật khẩu người dùng
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (
    {
      currentPassword,
      newPassword,
    }: {currentPassword: string; newPassword: string},
    {rejectWithValue},
  ) => {
    try {
      await userAPI.updatePassword(currentPassword, newPassword);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update password',
      );
    }
  },
);

// Xóa tài khoản người dùng
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, {rejectWithValue}) => {
    try {
      await userAPI.deleteUser();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete user',
      );
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Lấy thông tin người dùng
      .addCase(fetchUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Cập nhật thông tin người dùng
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Cập nhật mật khẩu người dùng
      .addCase(updatePassword.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Xóa tài khoản người dùng
      .addCase(deleteUser.fulfilled, state => {
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Export các actions và selectors
export const {resetUser} = userSlice.actions;
export const userReducer = userSlice.reducer;

// Selector
export const selectUser = (state: RootState) => state.userReducer.user;
export const selectUserError = (state: RootState) => state.userReducer.error;
export const selectUserLoading = (state: RootState) =>
  state.userReducer.loading;

export default userSlice;
