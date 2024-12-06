// components/AddressItem.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Profile, Edit} from 'iconsax-react-native';
import {appColors} from '../../../constants/appColor';
import {RowComponent, TextComponent} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';

interface AddressItemProps {
  name: string;
  address: string;
  street?: string;
  phone: string;
  isDefault?: boolean;
  isChoose?: boolean;
  onEdit: () => void;
}

const AddressItem = ({
  name,
  address,
  street,
  phone,
  isDefault,
  isChoose,
  onEdit,
}: AddressItemProps) => (
  <View style={styles.container}>
    <View style={{marginLeft: 10}}>
      <RowComponent>
        <TextComponent text={name} size={14} font={fontFamilies.medium} />
        <TextComponent text={' | ' + phone} size={12} />
      </RowComponent>
      <TextComponent text={street} size={12} />
      <TextComponent text={address} size={12} />
      {isDefault ? (
        <View style={styles.default}>
          <TextComponent text="Mặc định" size={12} color={appColors.white} />
        </View>
      ) : (
        <View></View>
      )}
    </View>

    <TouchableOpacity onPress={onEdit} style={{right: 0}}>
      <Edit size={24} color={appColors.primary} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  default: {
    backgroundColor: appColors.primary,
    paddingVertical: 2, // Giảm khoảng cách dọc
    paddingHorizontal: 8, // Giảm khoảng cách ngang
    borderRadius: 5, // Bo góc cho phù hợp
    alignSelf: 'flex-start', // Đảm bảo chiều rộng khớp với nội dung
    marginTop: 5, // Khoảng cách trên nếu cần
  },
});

export default AddressItem;
