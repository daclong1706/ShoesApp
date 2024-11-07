export interface Cart {
  productId: string; // ID duy nhất cho sản phẩm
  name: string; // Tên sản phẩm
  colorName: string; // Tên của màu đã chọn
  colorImage: string; // Hình ảnh đại diện của màu đã chọn
  price: number; // Giá sản phẩm

  // Thông tin giỏ hàng
  quantity: number; // Số lượng sản phẩm trong giỏ hàng
  selectedColor: string; // ID của màu sắc đã chọn
  selectedSize: string; // Kích thước đã chọn của sản phẩm
}
