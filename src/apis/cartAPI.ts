// import axiosClient from './axiosClient';

// class CartAPI {
//   // Lấy tất cả sản phẩm trong giỏ hàng
//   getCart = async () => {
//     return await axiosClient.get('/cart');
//   };

//   // Thêm sản phẩm vào giỏ hàng
//   addToCart = async (
//     productId: String,
//     quantity = 1,
//     selectedColor = '',
//     selectedSize = '',
//   ) => {
//     return await axiosClient.post('/cart', {
//       productId,
//       quantity,
//       selectedColor,
//       selectedSize,
//     });
//   };

//   // Cập nhật sản phẩm trong giỏ hàng
//   updateCartItem = async (productId: String, updatedData: any) => {
//     return await axiosClient.patch(`/cart/${productId}`, updatedData);
//   };

//   // Xóa sản phẩm khỏi giỏ hàng
//   removeCartItem = async (
//     productId: string,
//     {
//       selectedColor,
//       selectedSize,
//     }: {selectedColor?: string; selectedSize?: string},
//   ) => {
//     return await axiosClient.delete(`/cart/${productId}`, {
//       data: {
//         selectedColor,
//         selectedSize,
//       },
//     });
//   };
// }

// const cartAPI = new CartAPI();
// export default cartAPI;

import axiosClient from './axiosClient';

class CartAPI {
  // Lấy giỏ hàng của người dùng
  getCart = async () => {
    return await axiosClient.get('/cart'); // API trả về toàn bộ giỏ hàng
  };

  // Thêm sản phẩm vào giỏ hàng
  addToCart = async (
    productId: string,
    productName: string,
    unitPrice: number,
    quantity = 1,
    selectedColor = '',
    selectedSize = '',
  ) => {
    return await axiosClient.post('/cart', {
      productId,
      productName,
      unitPrice,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  // Cập nhật sản phẩm trong giỏ hàng
  updateCartItem = async (
    productId: string,
    updatedData: {
      quantity?: number;
      selectedColor?: string;
      selectedSize?: string;
    },
  ) => {
    return await axiosClient.patch(`/cart/${productId}`, updatedData);
  };

  // Xóa sản phẩm khỏi giỏ hàng
  removeCartItem = async (
    productId: string,
    {
      selectedColor,
      selectedSize,
    }: {selectedColor?: string; selectedSize?: string},
  ) => {
    return await axiosClient.delete(`/cart/${productId}`, {
      data: {
        selectedColor,
        selectedSize,
      },
    });
  };
}

const cartAPI = new CartAPI();
export default cartAPI;
