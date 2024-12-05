// screens/AddAddress.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ButtonComponent, InputComponent, TextComponent} from '../../components';
import axios from 'axios';
import ContainerProfile from './components/ContainerProfile';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AddressModel} from '../../models/AddressModel';

const HERE_API_KEY = 'FDSrRQkvtZ4QPx6QMNN1384RW_SNr8tPZfWsFs-HMS8';

const AddAddress = ({navigation, route}: any) => {
  const {location} = route.params || {location: {latitude: 0, longitude: 0}};
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();

  const handleSave = () => {
    // Xử lý lưu địa chỉ
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
    <ContainerProfile title="Địa chỉ mới" isScroll>
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
            onPress={() => navigation.navigate('MapScreen')}>
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
            <Switch value={isDefault} onValueChange={setIsDefault} />
          </View>

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

export default AddAddress;
