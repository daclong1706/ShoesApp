import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ContainerComponent} from '../../components';
import ShoesCart from './ShoesCart';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {cartSelectorID, fetchCart} from '../../stores/reducers/cartSlice';
import productAPI from '../../apis/productAPI';
import {Cart} from '../../models/CartModel'; // Import `CartModel` đã được tạo ở bước trước

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(cartSelectorID);

  const [shoes, setShoes] = useState<Cart[]>([]);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const fetchDetailedShoes = async () => {
      const detailedShoes = await Promise.all(
        cart.map(async item => {
          const productRes = await productAPI.getProductById(item.productId);
          const productData = productRes.data.shoes;

          // Tìm màu phù hợp với `selectedColor` trong `colors`
          const selectedColorData = productData.colors.find(
            (color: any) => color.colorId === item.selectedColor,
          );

          const priceDiscount =
            productData.price -
            (productData.price *
              (selectedColorData?.discountPercentage ??
                productData.discountPercentage)) /
              100;
          return {
            productId: productData.productId,
            name: productData.name,
            colorName: selectedColorData ? selectedColorData.colorName : '',
            colorImage: selectedColorData ? selectedColorData.colorImage : '',
            price: priceDiscount,

            quantity: item.quantity,
            selectedColor: item.selectedColor ?? '',
            selectedSize: item.selectedSize ?? '',
          };
        }),
      );
      setShoes(detailedShoes);

      // Tính tổng giá trị của tất cả sản phẩm trong giỏ hàng
      const totalPrice = detailedShoes.reduce((sum, shoe) => {
        return sum + shoe.price * shoe.quantity;
      }, 0);
    };

    if (cart.length > 0) {
      fetchDetailedShoes();
    }
  }, [cart]);

  return (
    <ContainerComponent title="Giỏ hàng" isImageBackground isScroll>
      {shoes.length > 0 ? (
        shoes.map((shoe, index) => (
          <ShoesCart key={shoe.productId + index} item={shoe} />
        ))
      ) : (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text>Giỏ hàng của bạn đang trống</Text>
        </View>
      )}
    </ContainerComponent>
  );
};

export default CartScreen;
