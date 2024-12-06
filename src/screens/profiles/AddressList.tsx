// screens/AddressList.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import {ButtonComponent} from '../../components';
import AddressItem from './components/AddressItem';
import ContaineProfile from './components/ContainerProfile';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {
  addressesSelector,
  fetchAddresses,
} from '../../stores/reducers/addressSlice';
import {it} from 'node:test';

const AddressList = () => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();
  const addresses = useAppSelector(addressesSelector); // Lấy danh sách địa chỉ từ Redux store

  useEffect(() => {
    dispatch(fetchAddresses()); // Dispatch action lấy địa chỉ khi component mount
  }, [dispatch]);

  const handleEdit = (item: any) => {
    navigation.navigate('EditAddress', {
      item: item,
      location: {latitude: 0, longitude: 0},
    });
  };

  return (
    <ContaineProfile title="Địa chỉ">
      <View style={styles.container}>
        <FlatList
          data={addresses}
          keyExtractor={item => item._id || Math.random().toString()}
          renderItem={({item}) => (
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
          )}
        />
        <ButtonComponent
          text="Thêm địa chỉ mới"
          type="primary"
          onPress={() => navigation.navigate('AddAddress')}
        />
      </View>
    </ContaineProfile>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#F5F5F5'},
});

export default AddressList;
