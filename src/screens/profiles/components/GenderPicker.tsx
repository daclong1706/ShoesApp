import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {appColors} from '../../../constants/appColor';
import {fontFamilies} from '../../../constants/fontFamilies';

interface GenderPickerProps {
  selectedGender: string;
  setGender: (gender: string) => void;
}

const GenderPicker: React.FC<GenderPickerProps> = ({
  selectedGender,
  setGender,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedGender);
  const [items, setItems] = useState([
    {label: 'Nam', value: 'male'},
    {label: 'Nữ', value: 'female'},
    {label: 'Khác', value: 'other'},
  ]);

  const handleChangeGender = (gender: string) => {
    setGender(gender);
    setValue(gender);
  };

  const error = console.error;
  console.error = (...args: any) => {
    if (/VirtualizedLists/.test(args[0])) return;
    error(...args);
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={callback => {
          const selected = callback(value);
          handleChangeGender(selected);
        }}
        setItems={setItems}
        placeholder="Giới tính"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        ArrowDownIconComponent={() => (
          <FontAwesome6 name="caret-down" size={20} color={appColors.primary} />
        )}
        ArrowUpIconComponent={() => (
          <FontAwesome6 name="caret-up" size={20} color={appColors.primary} />
        )}
        zIndex={1000}
        zIndexInverse={3000}
        onChangeValue={gender => handleChangeGender(gender as string)}
      />
    </View>
  );
};

export default GenderPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  dropdown: {
    backgroundColor: appColors.grayTint,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: appColors.grayTint,
  },
});
