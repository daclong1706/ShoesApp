import DateTimePicker from '@react-native-community/datetimepicker';
import {Calendar, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CountryCode} from 'react-native-country-picker-modal';
import {ButtonComponent, TextComponent} from '../../components';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {selectUser, updateUser} from '../../stores/reducers/userSlice';
import ContainerProfile from './components/ContainerProfile';
import CountrySelector from './components/CountrySelector';
import GenderPicker from './components/GenderPicker';
import Toast from 'react-native-toast-message';
import {AddItemModal, LoadingModal} from '../../modals';

const EditProfileScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [fullName, setFullName] = useState(user?.name ?? '');
  const [firstName, setFirstName] = useState(user?.givenName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [birthDate, setBirthDate] = useState(
    new Date(user?.birthDate ?? Date.now()),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState(user?.phoneNumber ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');

  // State cho Country Picker
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [countryName, setCountryName] = useState('United States');
  const [callingCode, setCallingCode] = useState('1');

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const validGender =
        gender === 'male' || gender === 'female' || gender === 'other'
          ? gender
          : undefined;
      await dispatch(
        updateUser({
          name: fullName,
          givenName: firstName,
          birthDate: birthDate,
          phoneNumber: phone,
          gender: validGender,
        }),
      ).unwrap();

      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        navigation.goBack();
      }, 1000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi cập nhật',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } finally {
      setIsLoading(false); // Đảm bảo rằng setIsLoading luôn được gọi
    }
  };

  //console.log(countryCode, countryName, callingCode);

  return (
    <ContainerProfile title="Sửa hồ sơ" isScroll>
      <View style={styles.container}>
        {/* Full Name */}
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
        />

        {/* First Name */}
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />

        {/* Date of Birth */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.inputRow}>
          <TextComponent text={birthDate.toLocaleDateString()} />
          <Calendar size={20} color={appColors.primary} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
          />
        )}

        {/* Email - Không thể chỉnh sửa */}
        <View style={styles.inputRow}>
          <Text>{email}</Text>
          <Sms size={20} color={appColors.primary} />
        </View>

        {/* Country Picker and Calling*/}
        <CountrySelector
          countryCode={countryCode}
          countryName={countryName}
          callingCode={callingCode}
          phone={phone}
          setCountryCode={setCountryCode}
          setCountryName={setCountryName}
          setCallingCode={setCallingCode}
          setPhone={setPhone}
        />

        {/* Gender */}
        <GenderPicker selectedGender={gender} setGender={setGender} />

        {/* Button cập nhật */}
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <ButtonComponent
            type="primary"
            text="Cập nhật"
            textFont={fontFamilies.regular}
            size={16}
            onPress={handleUpdateProfile}
          />
        </View>
      </View>
      <AddItemModal visible={visible} mess="Cập nhật thông tin thành công" />
      <LoadingModal visible={isLoading} />
    </ContainerProfile>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  input: {
    backgroundColor: appColors.grayTint,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: appColors.grayTint,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
});
