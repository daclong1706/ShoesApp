import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../../stores/hook';
import {
  fetchUser,
  selectUser,
  selectUserStatus,
} from '../../stores/reducers/userSlice';
import {removeAuth} from '../../stores/reducers/authReducer';
import {ButtonComponent} from '../../components';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectUserStatus);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      dispatch(removeAuth());
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No user data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1, padding: 20, backgroundColor: '#F5F5F5'}}>
      {/* Header Profile Info */}
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <TouchableOpacity>
          <Image
            source={{uri: user.photo}}
            style={{width: 80, height: 80, borderRadius: 40, marginBottom: 10}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
        <Text style={{fontSize: 14, color: '#888'}}>{user.email}</Text>
        <Text style={{fontSize: 14, color: '#888'}}>{user.phone}</Text>
      </View>

      {/* Profile Options */}
      <View>
        {[
          {label: 'Edit Profile', onPress: () => {}},
          {label: 'Address', onPress: () => {}},
          {label: 'Notification', onPress: () => {}},
          {label: 'Payment', onPress: () => {}},
          {label: 'Security', onPress: () => {}},
          {label: 'Language', value: 'English (US)', onPress: () => {}},
          {label: 'Dark Mode', isSwitch: true},
          {label: 'Privacy Policy', onPress: () => {}},
          {label: 'Help Center', onPress: () => {}},
          {label: 'Invite Friends', onPress: () => {}},
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#EDEDED',
            }}
            onPress={item.onPress}>
            <Text style={{fontSize: 16}}>{item.label}</Text>
            {item.value && <Text style={{color: '#888'}}>{item.value}</Text>}
            {item.isSwitch && <Switch value={false} onValueChange={() => {}} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={{marginTop: 30}}>
        <ButtonComponent text="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
