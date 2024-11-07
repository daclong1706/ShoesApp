// store.ts
import {configureStore} from '@reduxjs/toolkit';
import {favoriteReducer} from './reducers/favoriteSlice';
import {authReducer} from './reducers/authReducer';
import {cartReducer} from './reducers/cartSlice';

const store = configureStore({
  reducer: {
    favoriteReducer, // Update name to `favorite`
    authReducer,
    cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
