import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import {ArrowDown2, Call} from 'iconsax-react-native';
import {appColors} from '../../../constants/appColor';
import {TextComponent} from '../../../components';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

interface Props {
  countryCode: CountryCode;
  countryName: string;
  callingCode: string;
  phone: string;
  setCountryCode: (code: CountryCode) => void;
  setCountryName: (name: string) => void;
  setCallingCode: (code: string) => void;
  setPhone: (code: string) => void;
}

const CountrySelector: React.FC<Props> = ({
  countryCode,
  countryName,
  callingCode,
  phone,
  setCountryCode,
  setCountryName,
  setCallingCode,
  setPhone,
}) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleCountrySelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountryName(typeof country.name === 'string' ? country.name : '');
    setCallingCode(country.callingCode[0] ?? '');
    setIsPickerVisible(false);
  };

  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <>
      {/* Nút để mở Country Picker */}
      <TouchableOpacity
        style={styles.inputRow}
        onPress={() => setIsPickerVisible(true)}>
        <TextComponent text={`${countryName} (${countryCode})`} />
        {/* <Text style={{flex: 1}}>{`${countryName} (${countryCode})`}</Text> */}
        <FontAwesome6
          name="caret-down"
          size={20}
          color={appColors.primary}
          // /style={style}
        />
      </TouchableOpacity>

      {/* Country Picker Modal */}

      <View style={[styles.inputRow, {padding: 0, paddingHorizontal: 15}]}>
        <CountryPicker
          withFilter
          withFlag
          // withCountryNameButton
          withAlphaFilter
          withCallingCode
          countryCode={countryCode}
          onSelect={handleCountrySelect}
          visible={isPickerVisible}
          onClose={() => setIsPickerVisible(false)}
        />
        <ArrowDown2 size={20} color="#000" />
        <Text style={{marginHorizontal: 10}}>{`+${callingCode}`}</Text>
        <TextInput
          style={{flex: 1}}
          value={phone}
          onChangeText={setPhone}
          placeholder="123 456 789"
          keyboardType="phone-pad"
        />
        <Call size={20} color={appColors.primary} />
      </View>
    </>
  );
};

export default CountrySelector;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
});
