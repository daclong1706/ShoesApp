import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import ContainerCart from './components/ContainerCart';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowRight2, Edit2} from 'iconsax-react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {appColors} from '../../constants/appColor';
import ShoesCart from './ShoesCart';
import {useSelector} from 'react-redux';
import {
  shippingReducer,
  shippingSelector,
} from '../../stores/reducers/shippingSlice';
import Toast from 'react-native-toast-message';
// import {addressSelector} from '../../stores/reducers/addressSlice';

const CheckoutScreen = ({navigation, route}: any) => {
  const {shoes, total} = route.params;
  const selectedShippingMethod = useSelector(shippingSelector);
  //const selectedAddressMethod = useSelector(addressSelector);

  const handlePayment = () => {
    if (!selectedShippingMethod) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng chọn phương thức vận chuyển',
        position: 'top',
        visibilityTime: 2000,
      });
    } else {
      const pay = selectedShippingMethod.price + total;
      navigation.navigate('PaymentMethod', {
        pay: pay,
        shipping: selectedShippingMethod,
        //address: selectedAddressMethod,
      });
    }
  };

  return (
    <ContainerCart
      title="Thanh toán"
      buttonText="Tiếp tục thanh toán"
      isScroll
      onPress={handlePayment}>
      <View style={{padding: 25}}>
        {/* Thông tin địa chỉ giao hàng */}
        <View>
          <TextComponent text="Địa chỉ giao hàng" size={18} title />
          <TouchableOpacity
            style={[styles.shipping, {padding: 15}]}
            onPress={() => navigation.navigate('ChooseAddressScreen')}>
            <RowComponent justify="space-between">
              <RowComponent styles={{flex: 1}}>
                <View
                  style={[
                    styles.iconContainer,
                    {borderWidth: 7, borderColor: '#DDDDDD'},
                  ]}>
                  <FontAwesome6
                    name="location-dot"
                    size={20}
                    color={appColors.white}
                  />
                </View>

                <View style={{flex: 1}}>
                  <TextComponent
                    text={'Home'}
                    styles={{fontWeight: 'bold', marginLeft: 12}}
                  />

                  {/* <TextComponent
                    text={
                      selectedAddressMethod
                        ? `Đường ${selectedAddressMethod.street}, ${selectedAddressMethod.city}, ${selectedAddressMethod.country}`
                        : ''
                    }
                    styles={{marginLeft: 12, marginTop: 6}}
                  /> */}
                </View>
              </RowComponent>
              <Edit2 size={22} color={appColors.primary} />
            </RowComponent>
          </TouchableOpacity>
        </View>
        <SpaceComponent line />

        {/* Danh sách đặt hàng */}
        <View>
          <TextComponent text="Danh sách đặt hàng" size={18} title />
          {shoes.map((shoe: any, index: any) => (
            <ShoesCart key={shoe.productId + index} item={shoe} isOrder />
          ))}
        </View>

        <SpaceComponent line />

        {/* Phần chọn phương thức vận chuyển */}
        <View>
          <TextComponent text="Vận chuyển" size={18} title />
          <TouchableOpacity
            style={styles.shipping}
            onPress={() => navigation.navigate('ChooseShippingScreen')}>
            <RowComponent justify="space-between">
              <RowComponent>
                {selectedShippingMethod ? (
                  <View style={styles.iconContainer}>
                    <FontAwesome6
                      name={selectedShippingMethod.icon}
                      size={22}
                      color={appColors.white}
                    />
                  </View>
                ) : (
                  <FontAwesome6
                    name="truck"
                    size={22}
                    color={appColors.primary}
                  />
                )}

                <TextComponent
                  text={
                    selectedShippingMethod
                      ? selectedShippingMethod.label
                      : 'Chọn phương thức vận chuyển'
                  }
                  styles={{marginLeft: 12}}
                  title
                  size={16}
                />
              </RowComponent>
              <ArrowRight2 size={22} color={appColors.primary} />
            </RowComponent>
          </TouchableOpacity>
        </View>

        <View style={styles.shipping}>
          <RowComponent justify="space-between">
            <TextComponent text="Thành tiền" />
            <TextComponent text={`${total.toLocaleString()} ₫`} />
          </RowComponent>
          <RowComponent justify="space-between" styles={{marginVertical: 12}}>
            <TextComponent text="Phí vận chuyển" />
            <TextComponent
              text={`${
                selectedShippingMethod
                  ? selectedShippingMethod.price.toLocaleString()
                  : '-'
              } ₫`}
            />
          </RowComponent>
          <SpaceComponent line />
          <RowComponent justify="space-between" styles={{marginVertical: 12}}>
            <TextComponent text="Tổng tiền" />
            <TextComponent
              text={`${
                selectedShippingMethod
                  ? (selectedShippingMethod.price + total).toLocaleString()
                  : '-'
              } ₫`}
            />
          </RowComponent>
        </View>
      </View>
    </ContainerCart>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  shipping: {
    backgroundColor: appColors.white,
    padding: 24,
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 12,
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
});
