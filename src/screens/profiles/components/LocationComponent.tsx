import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Location} from 'iconsax-react-native';

const LocationComponent = () => {
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
      Alert.alert(
        `Vị trí bạn chọn: Vĩ độ: ${selectedLocation.latitude}, Kinh độ: ${selectedLocation.longitude}`,
      );
      // Bạn có thể sử dụng vị trí này trong các thao tác khác hoặc gửi đến server
    }
  };

  // Xử lý khi bản đồ thay đổi vị trí
  const handleRegionChange = (region: any) => {
    // Cập nhật lại vị trí marker đỏ để luôn ở giữa màn hình
    setSelectedLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  return (
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
      <TouchableOpacity style={styles.button} onPress={handleOkPress}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>

      {/* <View style={styles.infoContainer}>
        <Text style={styles.title}>Thông tin vị trí</Text>
        <Text style={styles.label}>
          Vị trí hiện tại: Vĩ độ {location ? location.latitude : 'Chưa có'} |
          Kinh độ {location ? location.longitude : 'Chưa có'}
        </Text>
        <Text style={styles.label}>
          Vị trí bạn chọn: Vĩ độ{' '}
          {selectedLocation ? selectedLocation.latitude : 'Chưa có'} | Kinh độ{' '}
          {selectedLocation ? selectedLocation.longitude : 'Chưa có'}
        </Text>
      </View> */}
    </View>
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
  button: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{translateX: -40}],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LocationComponent;
