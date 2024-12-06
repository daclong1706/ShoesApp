import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {fetchOrders, ordersSelector} from '../../stores/reducers/orderSlice';
import {fontFamilies} from '../../constants/fontFamilies';
const OrderListScreen = () => {
  const dispatch = useAppDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Lấy danh sách đơn hàng từ Redux store
  const orders = useAppSelector(ordersSelector);
  // const orderStatus = useAppSelector(ordersSelector);
  const navigation: any = useNavigation();
  // Gọi API lấy danh sách đơn hàng khi màn hình được render
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Render item trong FlatList
  const renderItem = ({item}: {item: any}) => (
    <View style={styles.cardContainer}>
      <RowComponent styles={styles.text}>
        <TextComponent
          styles={styles.title}
          text={`Mã hóa đơn: `}
          font={fontFamilies.bold}
          size={16}
        />
        <TextComponent text={`${item._id}`} styles={styles.totalPrice} />
      </RowComponent>
      <RowComponent styles={styles.text}>
        <TextComponent text="Người nhận: " styles={styles.title} />
        <TextComponent
          text={`${item.shippingAddress.name}`}
          styles={styles.totalPrice}
        />
      </RowComponent>
      <RowComponent styles={styles.text}>
        <TextComponent text="Người nhận: " styles={styles.title} />
        <TextComponent
          text={`${item.shippingAddress.street}, ${item.shippingAddress.address}`}
          styles={styles.totalPrice}
        />
      </RowComponent>
      <RowComponent styles={styles.text}>
        <TextComponent text="Tổng tiền: " styles={styles.title} />
        <TextComponent
          text={`${item.totalAmount.toLocaleString()} đ`}
          styles={styles.totalPrice}
        />
      </RowComponent>
      <RowComponent styles={styles.text}>
        <TextComponent text="Ngày đặt: " styles={styles.title} />
        <TextComponent
          text={`${item.orderDate.split('T')[0]}`}
          styles={styles.totalPrice}
        />
      </RowComponent>
      <View style={styles.checkoutButtonContainer}>
        <ButtonComponent
          onPress={() =>
            navigation.navigate('OrderDetail', {
              item: item,
              success: false,
            })
          }
          text="Xem chi tiết"
          type="primary"
          styles={{width: '100%'}}
        />
      </View>
    </View>
  );

  const filterOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  // Nếu không có đơn hàng
  if (orders.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hiện tại bạn không có đơn đặt hàng nào</Text>
      </View>
    );
  }

  return (
    <ContainerComponent title="Hóa đơn" back>
      <View style={styles.segmentedControlContainer}>
        <SegmentedControl
          values={['Đang xử lý', 'Đang giao', 'Đã giao', 'Đã hủy']}
          selectedIndex={selectedIndex}
          onChange={({nativeEvent}) =>
            setSelectedIndex(nativeEvent.selectedSegmentIndex)
          }
          backgroundColor={appColors.white}
          fontStyle={{fontFamily: fontFamilies.medium}}
        />
        <View style={styles.borderBottom}></View>
      </View>
      <View style={styles.segmentedControlContainer}>
        {/* Danh sách đơn hàng theo trạng thái đã chọn */}
        {filterOrdersByStatus(
          ['Pending', 'Shipped', 'Delivered', 'Cancelled'][selectedIndex],
        ).length > 0 ? (
          <FlatList
            data={filterOrdersByStatus(
              ['Pending', 'Shipped', 'Delivered', 'Cancelled'][selectedIndex],
            )}
            renderItem={renderItem}
            keyExtractor={item => String(item._id)}
            style={styles.flatList}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/no-item.png')}
              style={{
                width: 250,
                height: 250,
                marginTop: 100,
                marginBottom: 50,
              }}
              resizeMode="contain"
            />
            <TextComponent text="Hiện tại bạn không có đơn đặt hàng nào" />
          </View>
        )}
      </View>
    </ContainerComponent>
  );
};

export default OrderListScreen;

const styles = StyleSheet.create({
  text: {
    alignItems: 'flex-start',
    marginVertical: 4,
    fontSize: 16,
  },
  segmentedControlContainer: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  borderBottom: {
    height: 2,
    backgroundColor: appColors.primary, // Màu đường kẻ dưới
    marginTop: 10,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    padding: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.primary,
  },
  flatList: {
    marginTop: 10,
  },
  checkoutButtonContainer: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: appColors.primary,
    fontFamily: fontFamilies.medium,
  },
  totalPrice: {
    fontSize: 16,
    color: appColors.primary,
    fontFamily: fontFamilies.regular,
  },
});
