import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationItem from './components/NotificationItem';
import ContaineProfile from './components/ContainerProfile';

interface NotificationSetting {
  id: string;
  label: string;
  value: boolean;
}

const initialSettings: NotificationSetting[] = [
  {id: 'general', label: 'Thông báo chung', value: false},
  {id: 'sound', label: 'Âm thanh', value: false},
  {id: 'vibrate', label: 'Rung', value: false},
  {id: 'offers', label: 'Ưu đãi đặc biệt', value: true},
  {id: 'promo', label: 'Khuyến mãi & Giảm giá', value: false},
  {id: 'payments', label: 'Thanh toán', value: true},
  {id: 'cashback', label: 'Hoàn tiền', value: false},
  {id: 'updates', label: 'Cập nhật ứng dụng', value: true},
  {id: 'service', label: 'Dịch vụ mới có sẵn', value: false},
  {id: 'tips', label: 'Mẹo mới có sẵn', value: false},
];

const NotificationSettings = () => {
  const [settings, setSettings] =
    useState<NotificationSetting[]>(initialSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [settings]);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('notificationSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Không thể tải cài đặt:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        'notificationSettings',
        JSON.stringify(settings),
      );
    } catch (error) {
      console.error('Không thể lưu cài đặt:', error);
    }
  };

  const toggleSetting = (id: string) => {
    const updatedSettings = settings.map(setting =>
      setting.id === id ? {...setting, value: !setting.value} : setting,
    );
    setSettings(updatedSettings);
  };

  return (
    <ContaineProfile title="Cài đặt thông báo">
      <FlatList
        data={settings}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NotificationItem
            label={item.label}
            value={item.value}
            onToggle={() => toggleSetting(item.id)}
          />
        )}
      />
    </ContaineProfile>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    color: '#000',
  },
});

export default NotificationSettings;
