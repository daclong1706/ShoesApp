import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface AddressState {
  selectedMethod: any;
}

const initialState: AddressState = {
  selectedMethod: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddressMethod: (state, action: PayloadAction<any>) => {
      state.selectedMethod = action.payload.method;
    },
  },
});

export const {setAddressMethod} = addressSlice.actions;
export const addressReducer = addressSlice.reducer;
export const addressSelector = (state: RootState) =>
  state.addressReducer.selectedMethod;
