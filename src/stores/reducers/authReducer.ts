import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  id: string;
  email: string;
  accesstoken: string;
  name: string;
  photo: string;
}

const initialState: AuthState = {
  id: '',
  email: '',
  accesstoken: '',
  photo: '',
  name: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {authData: initialState}, // Không cần lặp lại initialState bên ngoài
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: state => {
      state.authData = initialState;
    },
  },
});

export const {addAuth, removeAuth} = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state: any) => state.authReducer.authData;
