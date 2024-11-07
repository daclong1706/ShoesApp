import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  addToCart,
  cartSelector,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from '../../stores/reducers/cartSlice';
import {useAppDispatch, useAppSelector} from '../../stores/hook';

const EventScreen = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(cartSelector);

  // Lấy giỏ hàng khi component được mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (productId: any) => {
    dispatch(addToCart({productId, quantity: 1}));
  };

  // Cập nhật sản phẩm trong giỏ hàng
  const handleUpdateCartItem = (productId: string, quantity: number) => {
    dispatch(updateCartItem({productId, updatedData: {quantity}}));
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveCartItem = (productId: any) => {
    dispatch(removeCartItem(productId));
  };
  return (
    <View>
      <Text>EventScreen</Text>
    </View>
  );
};

export default EventScreen;
