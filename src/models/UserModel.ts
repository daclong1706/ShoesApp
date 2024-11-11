export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
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
  phoneNumber?: string;
  photo?: string;
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
