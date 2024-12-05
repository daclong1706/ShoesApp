import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColor';
import {appInfo} from '../constants/appInfos';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  visible: boolean;
}

const AccountModal = ({visible}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                borderRadius: 120,
                backgroundColor: appColors.primary,
                marginBottom: 20,
              }}>
              <Image
                source={require('../assets/images/party-popper.png')}
                tintColor={appColors.white}
                resizeMode="cover"
                style={{width: 88, height: 88}}
              />
            </View>
            <TextComponent
              text="Chúc mừng"
              size={24}
              font={fontFamilies.bold}
            />
            <TextComponent
              text="Tạo tài khoản thành công! Chúc bạn có những trải nghiệm mua sắm tuyệt vời!"
              size={16}
              font={fontFamilies.medium}
              styles={{textAlign: 'center', marginTop: 12}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AccountModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    paddingBottom: 40,
    marginHorizontal: 12,
  },
});
