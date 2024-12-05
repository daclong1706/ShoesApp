import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import orderAPI from '../../apis/orderAPI';

// Định nghĩa kiểu dữ liệu cho các mặt hàng trong đơn hàng
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedColor?: string;
  selectedSize?: string;
}

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
  _id: any;
  orderDate: string;
  requiredDate?: string;
  shippedDate?: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: {
    method: string;
    price: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentDetails: {
    method: string;
    status: string;
    transactionId?: string;
  };
}

// Định nghĩa kiểu trạng thái của đơn hàng trong Redux
interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
};

// Async Thunks cho các thao tác API

// Lấy danh sách đơn hàng
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await orderAPI.getOrders();
  return response.orders; // Lấy danh sách đơn hàng từ API
});

// Tạo đơn hàng mới
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({
    shippingAddress,
    paymentDetails,
  }: {
    shippingAddress: Order['shippingAddress'];
    paymentDetails: Order['paymentDetails'];
  }) => {
    const response = await orderAPI.createOrder(
      shippingAddress,
      paymentDetails,
    );
    return response.order; // Trả về đơn hàng vừa tạo
  },
);

// Lấy chi tiết đơn hàng
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string) => {
    const response = await orderAPI.getOrderById(orderId);
    return response.order; // Lấy chi tiết đơn hàng theo ID
  },
);

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({orderId, status}: {orderId: string; status: string}) => {
    const response = await orderAPI.updateOrderStatus(orderId, status);
    return {orderId, status}; // Trả về orderId và trạng thái mới
  },
);

// Hủy đơn hàng (cập nhật trạng thái đơn hàng thành "canceled")
export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId: string) => {
    const response = await orderAPI.updateOrderStatus(orderId, 'Cancelled'); // Cập nhật trạng thái thành "canceled"
    return {orderId, status: 'Cancelled'}; // Trả về orderId và trạng thái "canceled"
  },
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    clearCurrentOrder: state => {
      state.currentOrder = null;
    },
    setCurrentOrderID: (state, action: PayloadAction<string>) => {
      if (state.currentOrder) {
        state.currentOrder._id = action.payload; // Lưu orderID vào currentOrder
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
        },
      )
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload); // Thêm đơn hàng vào danh sách
        state.currentOrder = action.payload; // Lưu đơn hàng mới vào currentOrder
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.currentOrder = action.payload;
        },
      )
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<{orderId: string; status: string}>) => {
          const {orderId, status} = action.payload;
          const order = state.orders.find(order => order._id === orderId);
          if (order) {
            order.status = status;
          }
        },
      )
      .addCase(
        cancelOrder.fulfilled,
        (state, action: PayloadAction<{orderId: string; status: string}>) => {
          const {orderId, status} = action.payload;
          const orderIndex = state.orders.findIndex(
            order => order._id === orderId,
          );
          if (orderIndex >= 0) {
            state.orders[orderIndex].status = status;
          }
        },
      );
  },
});

export const {setOrders, clearCurrentOrder, setCurrentOrderID} =
  orderSlice.actions;
export const orderReducer = orderSlice.reducer;

// Selectors để lấy dữ liệu từ Redux store
export const ordersSelector = (state: RootState) => state.orderReducer.orders;
export const currentOrderSelector = (state: RootState) =>
  state.orderReducer.currentOrder;
export const currentOrderIDSelector = (state: RootState) =>
  state.orderReducer.currentOrder?._id;
