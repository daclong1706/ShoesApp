import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Location} from 'iconsax-react-native';
import LocationComponent from './components/LocationComponent';
import ContaineProfile from './components/ContainerProfile';
import {ButtonComponent} from '../../components';
import {appInfo} from '../../constants/appInfos';

const MapScreen = ({navigation}: any) => {
  const [location, setLocation] = useState<any>(null); // Lưu thông tin vị trí hiện tại
  const [isLocationReady, setIsLocationReady] = useState(false); // Cờ kiểm tra vị trí đã sẵn sàng
  const [mapRef, setMapRef] = useState<MapView | null>(null); // Ref cho bản đồ
  const [selectedLocation, setSelectedLocation] = useState<any>(null); // Vị trí marker đỏ

  // Lấy vị trí hiện tại khi load
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude}); // Lưu vị trí hiện tại
        setSelectedLocation({latitude, longitude}); // Đặt vị trí marker đỏ
        setIsLocationReady(true);
      },
      error => console.error(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  // Xử lý khi nhấn nút OK
  const handleOkPress = () => {
    if (selectedLocation) {
      // Trả về vị trí cho màn hình AddAddress
      navigation.navigate('AddAddress', {
        location: selectedLocation,
      });
    }
  };

  const handleRegionChange = (region: any) => {
    setSelectedLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  return (
    <ContaineProfile title="Chọn địa chỉ">
      <View style={styles.container}>
        {isLocationReady ? (
          <MapView
            ref={ref => setMapRef(ref)}
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
            onRegionChangeComplete={handleRegionChange} // Cập nhật vị trí marker khi bản đồ thay đổi
          >
            {/* Marker đỏ cố định ở giữa màn hình */}
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title="Vị trí bạn chọn"
              pinColor="red"
            />
          </MapView>
        ) : (
          <Text>Đang tải vị trí...</Text>
        )}
        {isLocationReady ? (
          <View style={styles.infoContainer}>
            <MaterialIcons name="location-pin" size={44} color="red" />
          </View>
        ) : (
          <View></View>
        )}

        {/* Nút OK */}
        <View style={styles.containerButton}>
          <ButtonComponent
            type="primary"
            onPress={handleOkPress}
            text="Hoàn thành"
            styles={{width: appInfo.sizes.WIDTH * 0.9}}
          />
        </View>
      </View>
    </ContaineProfile>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {alignItems: 'center', marginBottom: 40},
  title: {fontSize: 18, fontWeight: 'bold'},
  label: {fontSize: 14, color: '#000'},
  containerButton: {
    position: 'absolute',
    bottom: 20,
  },
});

export default MapScreen;
