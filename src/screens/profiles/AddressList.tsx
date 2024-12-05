// screens/AddressList.tsx
import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ButtonComponent} from '../../components';
import AddressItem from './components/AddressItem';
import ContaineProfile from './components/ContainerProfile';

const AddressList = () => {
  const navigation: any = useNavigation();
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Home',
      address: '61480 Sunbrook Park, PC 5679',
      isDefault: true,
    },
    {id: '2', name: 'Office', address: '6993 Meadow Valley Terra, PC 3637'},
    {id: '3', name: 'Apartment', address: '21833 Clyde Gallagher, PC 4662'},
  ]);

  const handleEdit = (id: string) => {
    navigation.navigate('AddAddress', {id});
  };

  return (
    <ContaineProfile title="Địa chỉ">
      <View style={styles.container}>
        <FlatList
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <AddressItem
              name={item.name}
              address={item.address}
              isDefault={item.isDefault}
              onEdit={() => handleEdit(item.id)}
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
