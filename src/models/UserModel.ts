export interface Address {
  name: string; // Tên người nhận
  phone: string; // Số điện thoại
  address: string; // Địa chỉ (gồm xã, phường, quận, huyện, tỉnh, thành phố)
  street?: string; // Tên đường (optional)
  isDefault: boolean; // Đặt làm địa chỉ mặc định hay không
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  addedAt: Date;
}

export interface FavoriteItem {
  productId: string;
  addedAt: Date;
}

export interface Order {
  orderId: string;
  purchasedAt: Date;
  status: 'pending' | 'completed' | 'canceled';
}

export interface User {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  password?: string; // Để mật khẩu là tùy chọn vì không cần trên frontend
  birthDate?: Date;
  phoneNumber?: string | null; // Số điện thoại (optional và nullable)
  gender?: 'male' | 'female' | 'other';
  photo?: string | null;
  role: 'user' | 'admin' | 'guest';
  isActive: boolean;
  isVerified: boolean;
  address: Address[];
  cart: CartItem[];
  favorites: FavoriteItem[];
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
}
