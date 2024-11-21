import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface ShippingState {
  selectedMethod: any;
  estimatedDelivery: string | null;
}

const initialState: ShippingState = {
  selectedMethod: null,
  estimatedDelivery: null,
};

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    setShippingMethod: (state, action: PayloadAction<any>) => {
      state.selectedMethod = action.payload.method;
      state.estimatedDelivery = action.payload.estimatedDelivery;
    },
  },
});

export const {setShippingMethod} = shippingSlice.actions;
export const shippingReducer = shippingSlice.reducer;
export const shippingSelector = (state: RootState) =>
  state.shippingReducer.selectedMethod;
