export interface Shoes {
  productId: string; // ID duy nhất cho sản phẩm (bắt buộc)
  name: string; // Tên sản phẩm (bắt buộc)
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
  images?: string[]; // Danh sách URL hình ảnh chi tiết cho màu này
  discountPercentage?: number;
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

// const product: Root = {
//   productId: "CW2288-111",
//   name: "Nike Air Force 1 '07",
//   description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
//   originCountries: ["India", "Vietnam"],
//   styleId: "CW2288-111",
//   price: 2929000,
//   colors: [
//     {
//       colorId: "white-white",
//       colorName: "White/White",
//       colorImage: "https://link.to/thumbnail_white_white.jpg",
//       images: [
//         "https://link.to/white_white_image1.jpg",
//         "https://link.to/white_white_image2.jpg",
//         "https://link.to/white_white_image3.jpg"
//       ]
//     }
//   ],
//   sizes: ["EU 38.5", "EU 39", "EU 40", "EU 40.5", "EU 41", "EU 42", "EU 42.5", "EU 43"],
//   features: [
//     {
//       description: "Đế giữa bằng foam nhẹ, đàn hồi tốt",
//       image: "https://link.to/feature_image1.jpg"
//     }
//   ],
//   reviews: [
//     {
//       username: "AnthonyT904858449",
//       date: "2024-10-17",
//       rating: 5,
//       comment: "Màu sắc của đôi giày thật tuyệt vời..."
//     }
//   ],
//   similarProductIds: ["JAM123", "DUNK234"],
//   benefits: [
//     "The stitched overlays on the upper add heritage style, durability and support.",
//     "Originally designed for performance hoops, the Nike Air cushioning adds lightweight, all-day comfort.",
//     "The low-cut silhouette adds a clean, streamlined look.",
//     "The padded collar feels soft and comfortable."
//   ],
//   productDetails: [
//     "Foam midsole",
//     "Perforations on the toe",
//     "Rubber sole"
//   ],
//   origins: "Debuting in 1982, the AF-1 was the first basketball shoe to house Nike Air, revolutionising the game while rapidly gaining traction around the world. Today, the Air Force 1 stays true to its roots with the same soft and springy cushioning that changed sneaker history."
// };
