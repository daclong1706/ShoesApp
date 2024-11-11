// components/AddressItem.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Profile, Edit} from 'iconsax-react-native';
import {appColors} from '../../../constants/appColor';

interface AddressItemProps {
  name: string;
  address: string;
  isDefault?: boolean;
  onEdit: () => void;
}

const AddressItem = ({name, address, isDefault, onEdit}: AddressItemProps) => (
  <View style={styles.container}>
    <View style={styles.leftSection}>
      <Profile size={24} color={appColors.gray} />
      <View style={{marginLeft: 10}}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={onEdit}>
      <Edit size={24} color={appColors.gray} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  leftSection: {flexDirection: 'row', alignItems: 'center'},
  name: {fontWeight: 'bold', fontSize: 16},
  address: {color: '#888', fontSize: 14},
});

export default AddressItem;
