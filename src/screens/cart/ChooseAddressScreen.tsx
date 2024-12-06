import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerCart from './components/ContainerCart';
import {appColors} from '../../constants/appColor';
import {InputComponent, RowComponent, SpaceComponent} from '../../components';
import {
  Add,
  AddCircle,
  Flag,
  Location,
  PasswordCheck,
  Sms,
} from 'iconsax-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {
  addressesSelector,
  fetchAddresses,
} from '../../stores/reducers/addressSlice';
import AddressItem from '../profiles/components/AddressItem';

const ChooseAddressScreen = ({navigation, route}: any) => {
  const {shoes, total, selectedAddress} = route.params;
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(addressesSelector); // Lấy danh sách địa chỉ từ Redux store

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  ); // Trạng thái lưu ID địa chỉ được chọn

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id); // Cập nhật ID địa chỉ khi người dùng chọn
  };

  useEffect(() => {
    dispatch(fetchAddresses()); // Dispatch action lấy địa chỉ khi component mount
  }, [dispatch]);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleApply = () => {
    if (selectedAddressId) {
      const selectedAddress = addresses.find(
        address => address._id === selectedAddressId,
      );
      if (selectedAddress) {
        // Truyền tất cả các tham số cần thiết vào CheckoutScreen
        navigation.navigate('CheckoutScreen', {
          shoes: shoes, // Truyền danh sách giày
          total: total, // Truyền tổng tiền
          selectedAddress: selectedAddress, // Truyền địa chỉ đã chọn
        });
      }
    }
  };

  const handleEdit = (item: any) => {
    navigation.navigate('EditAddress', {
      item: item,
      location: {latitude: 0, longitude: 0},
    });
  };

  return (
    <ContainerCart
      title="Địa chỉ giao hàng"
      buttonText="Áp dụng"
      onPress={handleApply}>
      <View style={styles.container}>
        <FlatList
          data={addresses}
          keyExtractor={item => item._id || Math.random().toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelectAddress(item._id as string)}>
              <RowComponent>
                <View>
                  {selectedAddressId === item._id ? (
                    <MaterialIcons
                      name="radio-button-checked"
                      size={24}
                      color={appColors.primary}
                    />
                  ) : (
                    <MaterialIcons
                      name="radio-button-off"
                      size={24}
                      color={appColors.primary}
                    />
                  )}
                </View>
                <AddressItem
                  name={item.name}
                  address={item.address}
                  street={item.street}
                  phone={item.phone}
                  isDefault={item.isDefault}
                  onEdit={() => {
                    if (item._id) {
                      handleEdit(item);
                    }
                  }}
                />
              </RowComponent>

              <SpaceComponent line />
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.add}
          onPress={() => navigation.navigate('AddAddress')}>
          <Add size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </ContainerCart>
  );
};

export default ChooseAddressScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 16,
    backgroundColor: appColors.background,
  },
  add: {
    position: 'absolute',
    bottom: 120,
    right: 30,
    backgroundColor: appColors.primary,
    padding: 16,
    borderRadius: 32,
  },
});
