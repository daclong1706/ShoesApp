// screens/EditAddress.tsx
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ButtonComponent, TextComponent} from '../../components';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {AddressModel} from '../../models/AddressModel';
import {useAppDispatch} from '../../stores/hook';
import {
  createAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from '../../stores/reducers/addressSlice';
import ContainerProfile from './components/ContainerProfile';

const HERE_API_KEY = 'FDSrRQkvtZ4QPx6QMNN1384RW_SNr8tPZfWsFs-HMS8';

const EditAddress = ({navigation, route}: any) => {
  const {item, location} = route.params;
  const [name, setName] = useState(item.name);
  const [phone, setPhone] = useState(item.phone);
  const [address, setAddress] = useState(item.address);
  const [street, setStreet] = useState(item.street);
  const [isDefault, setIsDefault] = useState(item.isDefault);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const dispatch = useAppDispatch();

  const handleSave = () => {
    const newAddress = {
      name,
      phone,
      address,
      street,
      isDefault,
    };

    // Dispatch action để thêm địa chỉ
    dispatch(updateAddress({addressId: item._id, address: newAddress}))
      .then(() => {
        dispatch(fetchAddresses());
        navigation.goBack(); // Quay lại màn hình trước đó
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.log('Error saving address:', error);
      });
  };

  const handleDelete = () => {
    // Dispatch action để thêm địa chỉ
    dispatch(deleteAddress(item._id))
      .then(() => {
        dispatch(fetchAddresses());
        navigation.goBack(); // Quay lại màn hình trước đó
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.log('Error saving address:', error);
      });
  };

  const reverseGeoCode = async (lat: number, long: number) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apiKey=${HERE_API_KEY}`;
    try {
      const res = await axios.get(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        if (items.length > 0) {
          const addressData = items[0].address; // Lấy dữ liệu địa chỉ từ API
          setCurrentLocation(addressData); // Cập nhật đối tượng địa chỉ

          // Xây dựng địa chỉ cho phần Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã
          const fullAddress = [
            addressData.district,
            addressData.city,
            addressData.county,
          ]
            .filter(Boolean) // Lọc bỏ giá trị null/undefined
            .join(', '); // Kết nối thành chuỗi với dấu phẩy
          setAddress(fullAddress); // Cập nhật trường address
          setStreet(addressData.street); // Cập nhật trường street (nếu cần)
        }
      }
    } catch (error) {
      console.log('Error fetching address:', error);
    }
  };

  useEffect(() => {
    if (location.latitude !== 0 && location.longitude !== 0) {
      reverseGeoCode(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <ContainerProfile title="Sửa địa chỉ" isScroll>
      <View style={styles.container}>
        {/* <LocationComponent /> */}

        <View style={styles.form}>
          <TextComponent
            text="Liên hệ"
            title
            size={16}
            styles={{backgroundColor: '#eee', padding: 8, paddingLeft: 20}}
          />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Họ và tên"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Số điện thoại"
          />

          <TextComponent
            text="Địa chỉ"
            title
            size={16}
            styles={{backgroundColor: '#eee', padding: 8, paddingLeft: 20}}
          />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              margin: 12,
              borderColor: appColors.black,
              borderRadius: 6,
              borderWidth: 1,
              flexDirection: 'row',
            }}
            onPress={() => navigation.navigate('MapEditScreen', {item: item})}>
            <MaterialIcons
              name="location-on"
              size={24}
              color={appColors.black}
            />
            <TextComponent
              text="Chọn vị trí trên bản đồ"
              font={fontFamilies.medium}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Phường/Xã, Quận/Huyện, Tỉnh/Thành Phố"
          />
          <TextInput
            style={styles.input}
            value={street}
            onChangeText={setStreet}
            placeholder="Tên đường, tòa nhà, số nhà"
          />
          <TextComponent
            text="Cài đặt"
            title
            size={16}
            styles={{backgroundColor: '#eee', padding: 8, paddingLeft: 20}}
          />

          <View style={styles.switchRow}>
            <TextComponent text="Đặt làm địa chỉ mặc định" size={16} />
            <Switch
              value={isDefault}
              onValueChange={setIsDefault}
              trackColor={{false: '#000', true: '#000'}} // Đổi màu track
              thumbColor={isDefault ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>

          <ButtonComponent
            text="Xóa"
            type="primary"
            onPress={handleDelete}
            styles={{marginHorizontal: 12, marginBottom: 24}}
            color={appColors.primaryTint}
          />

          <ButtonComponent
            text="Hoàn thành"
            type="primary"
            onPress={handleSave}
            styles={{marginHorizontal: 12}}
          />
        </View>
      </View>
    </ContainerProfile>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {width: '100%', height: 200},
  form: {padding: 0},
  input: {
    fontFamily: fontFamilies.medium,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 24,
  },
});

export default EditAddress;
