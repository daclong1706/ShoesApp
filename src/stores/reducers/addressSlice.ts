import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import addressAPI from '../../apis/addressAPI';

// Định nghĩa kiểu dữ liệu cho AddressItem
interface AddressItem {
  _id?: string;
  name: string;
  phone: string;
  address: string;
  street?: string;
  isDefault: boolean;
}

// Định nghĩa kiểu trạng thái của địa chỉ trong Redux
interface AddressState {
  addresses: AddressItem[];
  currentAddress: AddressItem | null;
}

const initialState: AddressState = {
  addresses: [],
  currentAddress: null,
};

// Async Thunks cho các thao tác API

// Lấy danh sách địa chỉ của người dùng
export const fetchAddresses = createAsyncThunk(
  'addresses/fetchAddresses',
  async () => {
    const response = await addressAPI.getAddresses();
    console.log('Response slice: ', response);
    return response.addresses; // Trả về danh sách địa chỉ
  },
);

// Thêm địa chỉ mới
export const createAddress = createAsyncThunk(
  'addresses/createAddress',
  async (address: AddressItem) => {
    const response = await addressAPI.createAddress(address);
    return response.data.address; // Trả về địa chỉ vừa tạo
  },
);

// Cập nhật địa chỉ
export const updateAddress = createAsyncThunk(
  'addresses/updateAddress',
  async ({addressId, address}: {addressId: string; address: AddressItem}) => {
    const response = await addressAPI.updateAddress(addressId, address);
    return response.data.address; // Trả về địa chỉ sau khi cập nhật
  },
);

// Xóa địa chỉ
export const deleteAddress = createAsyncThunk(
  'addresses/deleteAddress',
  async (addressId: string) => {
    const response = await addressAPI.deleteAddress(addressId);
    return {addressId}; // Trả về addressId đã xóa
  },
);

// Đặt địa chỉ làm mặc định
export const setDefaultAddress = createAsyncThunk(
  'addresses/setDefaultAddress',
  async (addressId: string) => {
    const response = await addressAPI.setDefaultAddress(addressId);
    return response.data.address; // Trả về địa chỉ được đặt làm mặc định
  },
);

// Định nghĩa Slice cho Redux
const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    // Clear current address
    clearCurrentAddress: state => {
      state.currentAddress = null;
    },
    // Set current address
    setCurrentAddress: (state, action: PayloadAction<AddressItem>) => {
      state.currentAddress = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Lấy danh sách địa chỉ
      .addCase(
        fetchAddresses.fulfilled,
        (state, action: PayloadAction<AddressItem[]>) => {
          state.addresses = action.payload;
        },
      )
      // Thêm địa chỉ mới
      .addCase(
        createAddress.fulfilled,
        (state, action: PayloadAction<AddressItem>) => {
          state.addresses.push(action.payload); // Thêm địa chỉ mới vào mảng
          state.currentAddress = action.payload; // Lưu địa chỉ mới vào currentAddress
        },
      )
      // Cập nhật địa chỉ
      .addCase(
        updateAddress.fulfilled,
        (state, action: PayloadAction<AddressItem>) => {
          const index = state.addresses.findIndex(
            address => address._id === action.payload._id,
          );
          if (index >= 0) {
            state.addresses[index] = action.payload; // Cập nhật địa chỉ
          }
        },
      )
      // Xóa địa chỉ
      .addCase(
        deleteAddress.fulfilled,
        (state, action: PayloadAction<{addressId: string}>) => {
          state.addresses = state.addresses.filter(
            address => address._id !== action.payload.addressId,
          ); // Xóa địa chỉ khỏi mảng
          if (state.currentAddress?._id === action.payload.addressId) {
            state.currentAddress = null; // Nếu xóa địa chỉ hiện tại, set null
          }
        },
      )
      // Đặt địa chỉ làm mặc định
      .addCase(
        setDefaultAddress.fulfilled,
        (state, action: PayloadAction<AddressItem>) => {
          state.addresses.forEach(address => {
            address.isDefault = address._id === action.payload._id;
          }); // Đặt isDefault cho địa chỉ được chọn
          state.currentAddress = action.payload; // Cập nhật currentAddress
        },
      );
  },
});

// Export các actions
export const {setCurrentAddress, clearCurrentAddress} = addressSlice.actions;

// Export reducer
export const addressReducer = addressSlice.reducer;

// Selectors để lấy dữ liệu từ Redux store
export const addressesSelector = (state: RootState) =>
  state.addressReducer.addresses;
export const currentAddressSelector = (state: RootState) =>
  state.addressReducer.currentAddress;
