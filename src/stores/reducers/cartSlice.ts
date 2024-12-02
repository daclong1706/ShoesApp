// import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {RootState} from '../store';
// import cartAPI from '../../apis/cartAPI';

// interface CartItem {
//   productId: string;
//   quantity: number;
//   selectedColor?: string;
//   selectedSize?: string;
// }

// interface CartState {
//   cart: CartItem[];
// }

// const initialState: CartState = {
//   cart: [],
// };

// // Async Thunks cho các thao tác API

// // Lấy giỏ hàng từ API
// export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
//   const response = await cartAPI.getCart();
//   return response.data.cart;
// });

// // Thêm sản phẩm vào giỏ hàng
// export const addToCart = createAsyncThunk(
//   'cart/addToCart',
//   async (item: CartItem) => {
//     const response = await cartAPI.addToCart(
//       item.productId,
//       item.quantity,
//       item.selectedColor,
//       item.selectedSize,
//     );
//     return response.data.cart;
//   },
// );

// // Cập nhật sản phẩm trong giỏ hàng
// export const updateCartItem = createAsyncThunk(
//   'cart/updateCartItem',
//   async ({
//     productId,
//     updatedData,
//   }: {
//     productId: string;
//     updatedData: Partial<CartItem>;
//   }) => {
//     const response = await cartAPI.updateCartItem(productId, updatedData);
//     return {productId, updatedData};
//   },
// );

// // Xóa sản phẩm khỏi giỏ hàng theo `productId`, `selectedColor`, và `selectedSize`
// export const removeCartItem = createAsyncThunk(
//   'cart/removeCartItem',
//   async ({
//     productId,
//     selectedColor,
//     selectedSize,
//   }: {
//     productId: string;
//     selectedColor?: string;
//     selectedSize?: string;
//   }) => {
//     await cartAPI.removeCartItem(productId, {selectedColor, selectedSize});
//     return {productId, selectedColor, selectedSize};
//   },
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     setCart: (state, action: PayloadAction<CartItem[]>) => {
//       state.cart = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(
//         fetchCart.fulfilled,
//         (state, action: PayloadAction<CartItem[]>) => {
//           state.cart = action.payload;
//         },
//       )
//       .addCase(
//         addToCart.fulfilled,
//         (state, action: PayloadAction<CartItem[]>) => {
//           state.cart = action.payload;
//         },
//       )
//       .addCase(
//         updateCartItem.fulfilled,
//         (
//           state,
//           action: PayloadAction<{
//             productId: string;
//             updatedData: Partial<CartItem>;
//           }>,
//         ) => {
//           const {productId, updatedData} = action.payload;
//           const itemIndex = state.cart.findIndex(
//             item =>
//               item.productId === productId &&
//               item.selectedColor === updatedData.selectedColor &&
//               item.selectedSize === updatedData.selectedSize,
//           );
//           if (itemIndex !== -1) {
//             state.cart[itemIndex] = {...state.cart[itemIndex], ...updatedData};
//           }
//         },
//       )
//       .addCase(
//         removeCartItem.fulfilled,
//         (
//           state,
//           action: PayloadAction<{
//             productId: string;
//             selectedColor?: string;
//             selectedSize?: string;
//           }>,
//         ) => {
//           const {productId, selectedColor, selectedSize} = action.payload;
//           state.cart = state.cart.filter(
//             item =>
//               !(
//                 item.productId === productId &&
//                 item.selectedColor === selectedColor &&
//                 item.selectedSize === selectedSize
//               ),
//           );
//         },
//       );
//   },
// });

// export const {setCart} = cartSlice.actions;
// export const cartReducer = cartSlice.reducer;
// export const cartSelectorID = (state: RootState) => state.cartReducer.cart;

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import cartAPI from '../../apis/cartAPI';

interface CartItem {
  _id?: string; // ID của mục trong giỏ hàng
  productId: string; // ID sản phẩm
  productName: string; // Tên sản phẩm
  quantity: number; // Số lượng
  unitPrice: number; // Giá mỗi sản phẩm
  totalPrice: number; // Tổng giá trị (quantity * unitPrice)
  selectedColor?: string; // Màu sắc được chọn
  selectedSize?: string; // Kích thước được chọn
}

interface CartState {
  cart: CartItem[]; // Danh sách sản phẩm trong giỏ hàng
  totalAmount: number; // Tổng giá trị toàn bộ giỏ hàng
}

const initialState: CartState = {
  cart: [],
  totalAmount: 0,
};

// Async Thunks

// Lấy giỏ hàng từ API
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await cartAPI.getCart();
  console.log('API response:', response.data.cart); // Log dữ liệu trả về
  return response.data.cart; // Trả về object `cart`
});

// Thêm sản phẩm vào giỏ hàng
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItem: Omit<CartItem, '_id' | 'totalPrice'>) => {
    const response = await cartAPI.addToCart(
      cartItem.productId,
      cartItem.productName,
      cartItem.unitPrice,
      cartItem.quantity,
      cartItem.selectedColor,
      cartItem.selectedSize,
    );
    console.log('API response:', response.data); // Log toàn bộ phản hồi API
    console.log('Cart from API:', response.data.cart); // Kiểm tra `cart`
    return response.data.cart; // Trả về object `cart`
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
    console.log('API response:', response.data.cart); // Log dữ liệu trả về
    return response.data.cart; // Trả về object `cart`
  },
);

// Xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({
    productId,
    selectedColor,
    selectedSize,
  }: {
    productId: string;
    selectedColor?: string;
    selectedSize?: string;
  }) => {
    const response = await cartAPI.removeCartItem(productId, {
      selectedColor,
      selectedSize,
    });
    console.log('API response:', response.data.cart); // Log dữ liệu trả về
    return response.data.cart; // Trả về object `cart`
  },
);

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
      state.totalAmount = action.payload.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<any>) => {
        const cartData = action.payload;
        if (!cartData || !Array.isArray(cartData.items)) {
          console.error('Invalid cart data:', cartData);
          return;
        }
        state.cart = cartData.items; // Lấy danh sách sản phẩm từ `items`
        state.totalAmount = cartData.totalAmount; // Lấy tổng giá trị từ `totalAmount`
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
        const cartData = action.payload;
        if (!cartData || !Array.isArray(cartData.items)) {
          console.error('Invalid cart data:', cartData);
          return;
        }
        state.cart = cartData.items; // Cập nhật danh sách sản phẩm
        state.totalAmount = cartData.totalAmount; // Cập nhật tổng giá trị
      })
      .addCase(
        updateCartItem.fulfilled,
        (state, action: PayloadAction<any>) => {
          const cartData = action.payload;
          if (!cartData || !Array.isArray(cartData.items)) {
            console.error('Invalid cart data:', cartData);
            return;
          }
          state.cart = cartData.items; // Cập nhật danh sách sản phẩm
          state.totalAmount = cartData.totalAmount; // Cập nhật tổng giá trị
        },
      )
      .addCase(
        removeCartItem.fulfilled,
        (state, action: PayloadAction<any>) => {
          const cartData = action.payload;
          if (!cartData || !Array.isArray(cartData.items)) {
            console.error('Invalid cart data:', cartData);
            return;
          }
          state.cart = cartData.items; // Cập nhật danh sách sản phẩm
          state.totalAmount = cartData.totalAmount; // Cập nhật tổng giá trị
        },
      );
  },
});

export const {setCart} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

// Selectors
export const cartSelector = (state: RootState) => state.cartReducer.cart;
export const totalAmountSelector = (state: RootState) =>
  state.cartReducer.totalAmount;
