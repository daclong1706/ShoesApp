import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {ButtonComponent, TextComponent, RowComponent} from '../../components';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {appColors} from '../../constants/appColor';
import ContainerCart from './components/ContainerCart';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {
  setShippingMethod,
  shippingSelector,
} from '../../stores/reducers/shippingSlice';

// Định nghĩa kiểu dữ liệu cho phương thức vận chuyển
interface ShippingMethod {
  id: string;
  label: string;
  minDays: number;
  maxDays: number;
  price: number;
  icon: string;
}

// Danh sách phương thức vận chuyển
const shippingMethods: ShippingMethod[] = [
  {
    id: '1',
    label: 'Tiết kiệm',
    minDays: 7,
    maxDays: 10,
    price: 10000,
    icon: 'coins',
  },
  {
    id: '2',
    label: 'Bình thường',
    minDays: 5,
    maxDays: 7,
    price: 15000,
    icon: 'box',
  },
  {
    id: '3',
    label: 'Chuyển phát nhanh',
    minDays: 3,
    maxDays: 5,
    price: 20000,
    icon: 'truck',
  },
  {
    id: '4',
    label: 'Hỏa tốc',
    minDays: 1,
    maxDays: 2,
    price: 30000,
    icon: 'truck-fast',
  },
];

// Hàm tính toán ngày giao hàng dự kiến
const calculateEstimatedDelivery = (
  minDays: number,
  maxDays: number,
): string => {
  const formatDate = (date: Date) =>
    `${date.getDate()} Th${date.getMonth() + 1}`;
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(startDate.getDate() + minDays);
  endDate.setDate(endDate.getDate() + maxDays);

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

// Màn hình chọn phương thức vận chuyển
const ChooseShippingScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const selectedMethod = useSelector(shippingSelector);
  const [localSelectedMethod, setLocalSelectedMethod] =
    useState<ShippingMethod | null>(selectedMethod);

  // Xử lý khi nhấn nút "Áp dụng"
  const handleApply = () => {
    if (localSelectedMethod) {
      const estimatedDelivery = calculateEstimatedDelivery(
        localSelectedMethod.minDays,
        localSelectedMethod.maxDays,
      );

      dispatch(
        setShippingMethod({method: localSelectedMethod, estimatedDelivery}),
      );
      navigation.goBack();
    } else {
      showToast('error', 'Vui lòng chọn phương thức vận chuyển');
    }
  };

  // Hiển thị thông báo
  const showToast = (type: string, message: string) => {
    Toast.show({
      type,
      text1: message,
      position: 'top',
      visibilityTime: 2000,
    });
  };

  // Render từng mục phương thức vận chuyển
  const renderShippingItem = ({item}: {item: ShippingMethod}) => {
    const isSelected = localSelectedMethod?.id === item.id;

    return (
      <TouchableOpacity
        style={[styles.shippingItem, isSelected && styles.selectedItem]}
        onPress={() => setLocalSelectedMethod(item)}>
        <RowComponent>
          <View style={styles.iconContainer}>
            <FontAwesome6 name={item.icon} size={22} color={appColors.white} />
          </View>
          <View style={styles.infoContainer}>
            <TextComponent text={item.label} styles={styles.itemLabel} />
            <TextComponent
              text={calculateEstimatedDelivery(item.minDays, item.maxDays)}
            />
          </View>
        </RowComponent>
        <TextComponent
          text={`${item.price.toLocaleString()} ₫`}
          size={16}
          styles={styles.itemLabel}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ContainerCart
      title="Phương thức vận chuyển"
      buttonText="Áp dụng"
      onPress={handleApply}>
      <View style={styles.container}>
        <FlatList
          data={shippingMethods}
          renderItem={renderShippingItem}
          keyExtractor={item => item.id}
        />
      </View>
    </ContainerCart>
  );
};

export default ChooseShippingScreen;

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: appColors.background,
  },
  shippingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: appColors.white,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedItem: {
    borderColor: appColors.primary,
    borderWidth: 1,
  },
  iconContainer: {
    backgroundColor: appColors.primary,
    padding: 10,
    width: 54,
    height: 54,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 12,
  },
  itemLabel: {
    fontWeight: 'bold',
  },
});
