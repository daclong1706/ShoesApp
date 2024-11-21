import {Trash} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RowComponent, TextComponent} from '../../components';
import {Cart} from '../../models/CartModel';
import {
  fetchCart,
  removeCartItem,
  updateCartItem,
} from '../../stores/reducers/cartSlice';
import {useAppDispatch} from '../../stores/hook';
import Octicons from 'react-native-vector-icons/Octicons';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColor';
import {RemoveCartModal} from '../../modals';

interface Props {
  item: Cart;
  isOrder?: boolean;
}

const ShoesCart = (props: Props) => {
  const {item, isOrder} = props;

  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  const handleQuantity = async (increase: boolean) => {
    // Kiểm tra nếu tăng thì tăng số lượng, nếu giảm thì chỉ giảm nếu quantity > 1
    const newQuantity = increase ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity >= 1) {
      await dispatch(
        updateCartItem({
          productId: item.productId,
          updatedData: {
            quantity: newQuantity,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
          },
        }),
      );
    }
  };

  const handleRemove = async () => {
    await dispatch(
      removeCartItem({
        productId: item.productId,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      }),
    );
    dispatch(fetchCart());
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <RowComponent>
          <ImageBackground
            style={styles.image}
            source={{
              uri: item.colorImage,
            }}></ImageBackground>
          <View style={styles.content}>
            <RowComponent justify="space-between" styles={styles.row}>
              <TextComponent
                text={item.name}
                font={fontFamilies.medium}
                size={14}
              />
              {isOrder || (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Octicons name="trash" size={24} color="#000" />
                </TouchableOpacity>
              )}
            </RowComponent>
            <RowComponent styles={styles.row}>
              <TextComponent
                text={'Size | ' + item.selectedSize}
                font="bold"
                size={12}
                color={appColors.darkGray}
              />
            </RowComponent>
            <RowComponent justify="space-between">
              <TextComponent
                text={formatPrice(item.price * item.quantity)}
                font={fontFamilies.medium}
              />
              <RowComponent>
                {isOrder ? (
                  <View style={styles.containerQuantityOrder}>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                  </View>
                ) : (
                  <View style={styles.containerQuantity}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleQuantity(false)}>
                      <Text style={styles.text}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleQuantity(true)}>
                      <Text style={styles.text}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </RowComponent>
              {/* <RowComponent>
              
            </RowComponent> */}
            </RowComponent>
          </View>
        </RowComponent>
      </View>
      <RemoveCartModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleRemove}
        item={item}
      />
    </>
  );
};

export default ShoesCart;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    marginRight: 32,
  },
  content: {
    flex: 1,
    height: '100%',
    marginLeft: 16,
  },
  image: {
    height: 120,
    width: 120,
    padding: 10,
    borderRadius: 16,
  },
  row: {
    marginVertical: 6,
  },
  number: {
    marginHorizontal: 20,
  },
  containerQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Màu nền xám nhạt
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20, // Bo tròn
  },
  containerQuantityOrder: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Màu nền xám nhạt
    paddingHorizontal: 1,
    paddingVertical: 5,
    borderRadius: 40, // Bo tròn
  },
  button: {
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#000',
  },
});
