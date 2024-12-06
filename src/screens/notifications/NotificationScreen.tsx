import {View, Text, Image} from 'react-native';
import React from 'react';
import {ContainerComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';

const NotificationScreen = () => {
  return (
    <ContainerComponent title="Thông báo" back>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Image
          source={require('../../assets/images/notification.png')}
          style={{
            width: 250,
            height: 250,
            marginTop: 100,
            marginBottom: 50,
          }}
          resizeMode="contain"
        />
        <Text style={{fontFamily: fontFamilies.regular}}>
          Hiện tại bạn không có thông báo nào
        </Text>
      </View>
    </ContainerComponent>
  );
};

export default NotificationScreen;
