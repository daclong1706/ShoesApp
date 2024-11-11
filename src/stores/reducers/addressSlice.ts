import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Address} from '../../models/UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppDispatch} from '../store';

interface AddressState {
  addresses: Address[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AddressState = {
  addresses: [],
  status: 'idle',
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(
        addr => addr.id === action.payload.id,
      );
      if (index !== -1) state.addresses[index] = action.payload;
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        addr => addr.id !== action.payload,
      );
    },
  },
});

export const {setAddresses, addAddress, updateAddress, deleteAddress} =
  addressSlice.actions;

// Thunk để lấy dữ liệu từ AsyncStorage
export const fetchAddresses = () => async (dispatch: AppDispatch) => {
  try {
    const addresses = await AsyncStorage.getItem('addresses');
    if (addresses) {
      dispatch(setAddresses(JSON.parse(addresses)));
    }
  } catch (error) {
    console.error('Failed to load addresses:', error);
  }
};

// Thunk để lưu dữ liệu vào AsyncStorage
export const saveAddresses = (addresses: Address[]) => async () => {
  try {
    await AsyncStorage.setItem('addresses', JSON.stringify(addresses));
  } catch (error) {
    console.error('Failed to save addresses:', error);
  }
};

export default addressSlice.reducer;
