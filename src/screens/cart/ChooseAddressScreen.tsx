import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ContainerCart from './components/ContainerCart';
import {appColors} from '../../constants/appColor';
import {InputComponent} from '../../components';
import {Flag, Location, PasswordCheck, Sms} from 'iconsax-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addressSelector,
  setAddressMethod,
} from '../../stores/reducers/addressSlice';

interface AddressMethod {
  street: string;
  city: string;
  country: string;
}

const ChooseAddressScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const selectedMethod = useSelector(addressSelector);
  const [localSelectedMethod, setLocalSelectedMethod] =
    useState<AddressMethod | null>(selectedMethod);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleApply = () => {
    setLocalSelectedMethod({street: street, city: city, country: country});
    if (localSelectedMethod) {
      dispatch(setAddressMethod({method: localSelectedMethod}));
      navigation.goBack();
    }
  };

  return (
    <ContainerCart
      title="Địa chỉ giao hàng"
      buttonText="Áp dụng"
      onPress={handleApply}>
      <View style={styles.container}>
        <InputComponent
          value={street}
          placeholder="Đường"
          onChange={val => {
            setStreet(val);
          }}
          allowClear
          affix={<Location size={22} color={appColors.darkGray} />}
        />
        <InputComponent
          value={city}
          placeholder="Thành phố"
          onChange={val => {
            setCity(val);
          }}
          allowClear
          affix={
            <MaterialIcons
              name="location-city"
              size={22}
              color={appColors.darkGray}
            />
          }
        />
        <InputComponent
          value={country}
          placeholder="Quốc gia"
          onChange={val => {
            setCountry(val);
          }}
          allowClear
          affix={<Flag size={22} color={appColors.darkGray} />}
        />
      </View>
    </ContainerCart>
  );
};

export default ChooseAddressScreen;

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
