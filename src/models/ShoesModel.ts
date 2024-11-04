export interface Shoes {
  productId: string; // ID duy nhất cho sản phẩm (bắt buộc)
  name: string; // Tên sản phẩm (bắt buộc)
  type?: string;
  brand: string;
  price: number; // Giá sản phẩm (bắt buộc)
  description: string; // Mô tả sản phẩm (bắt buộc)
  colors: Color[]; // Danh sách các tùy chọn màu sắc, bao gồm danh sách hình ảnh cho từng màu (bắt buộc)

  discountPercentage?: number; // Phần trăm khuyến mãi (ví dụ, 10 cho 10%)
  sizes?: string[]; // Danh sách kích thước có sẵn
  features?: Feature[]; // Danh sách các tính năng của sản phẩm, mỗi tính năng có mô tả và hình ảnh
  reviews?: Review[]; // Danh sách các đánh giá của người dùng
  similarProductIds?: string[]; // Danh sách các ID của sản phẩm tương tự
  benefits?: string[]; // Danh sách các lợi ích của sản phẩm
  productDetails?: string[]; // Danh sách các chi tiết về sản phẩm
  origins?: string; // Lịch sử sản phẩm hoặc mô tả nguồn gốc
  label?: string; // Nhãn của sản phẩm (e.g., "Best Seller", "Best Choice", "New Arrival", "Limited Edition", "Exclusive")
}

// Interface cho màu sắc của sản phẩm, bao gồm danh sách hình ảnh cho mỗi màu
export interface Color {
  colorId: string; // ID của màu (để xác định duy nhất)
  colorName: string; // Tên của màu (e.g., "White/Black")
  colorImage?: string; // Hình ảnh đại diện cho màu đó (thumbnail hoặc ảnh chính)
  colorCode?: string;
  quantity: number;
  images?: string[]; // Danh sách URL hình ảnh chi tiết cho màu này
  discountPercentage?: number;
  country?: string[];
}

// Interface cho tính năng của sản phẩm
export interface Feature {
  description: string; // Mô tả của tính năng
  image: string; // URL hình ảnh minh họa cho tính năng
}

// Interface cho đánh giá của người dùng
export interface Review {
  username: string; // Tên người dùng đánh giá
  date: string; // Ngày đánh giá
  rating: number; // Điểm đánh giá (e.g., 4.5)
  comment: string; // Bình luận của người dùng
}
