import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import cartAPI from '../../apis/cartAPI';

interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

// Async Thunks cho các thao tác API

// Lấy giỏ hàng từ API
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await cartAPI.getCart();
  return response.data.cart;
});

// Thêm sản phẩm vào giỏ hàng
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (item: CartItem) => {
    const response = await cartAPI.addToCart(
      item.productId,
      item.quantity,
      item.selectedColor,
      item.selectedSize,
    );
    return response.data.cart;
  },
);

// Cập nhật sản phẩm trong giỏ hàng
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({
    productId,
    updatedData,
  }: {
    productId: string;
    updatedData: Partial<CartItem>;
  }) => {
    const response = await cartAPI.updateCartItem(productId, updatedData);
    return {productId, updatedData};
  },
);

// Xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (productId: string) => {
    await cartAPI.removeCartItem(productId);
    return productId;
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.cart = action.payload;
        },
      )
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.cart = action.payload;
        },
      )
      .addCase(
        updateCartItem.fulfilled,
        (
          state,
          action: PayloadAction<{
            productId: string;
            updatedData: Partial<CartItem>;
          }>,
        ) => {
          const {productId, updatedData} = action.payload;
          const itemIndex = state.cart.findIndex(
            item => item.productId === productId,
          );
          if (itemIndex !== -1) {
            state.cart[itemIndex] = {...state.cart[itemIndex], ...updatedData};
          }
        },
      )
      .addCase(
        removeCartItem.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.cart = state.cart.filter(
            item => item.productId !== action.payload,
          );
        },
      );
  },
});

export const {setCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelectorID = (state: RootState) => state.cartReducer.cart;
