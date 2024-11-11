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
import {ButtonComponent} from '../../components';
import axios from 'axios';
import LocationComponent from './components/LocationComponent';

const AddAddress = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [location, setLocation] = useState({latitude: 0, longitude: 0});

  const handleSave = () => {
    // Xử lý lưu địa chỉ
  };

  return (
    <View style={styles.container}>
      <LocationComponent />
      <View style={styles.form}>
        <Text style={styles.label}>Name Address</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Address Details</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <View style={styles.switchRow}>
          <Text>Make this as the default address</Text>
          <Switch value={isDefault} onValueChange={setIsDefault} />
        </View>

        <ButtonComponent text="Add" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {width: '100%', height: 200},
  form: {padding: 20},
  label: {marginVertical: 10, fontWeight: 'bold'},
  input: {borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 15},
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default AddAddress;
