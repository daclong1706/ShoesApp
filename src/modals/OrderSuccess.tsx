import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import {appColors} from '../constants/appColor';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {appInfo} from '../constants/appInfos';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  visible: boolean;
  onOrder: () => void;
  onShop: () => void;
}

const OrderSuccess = ({visible, onOrder, onShop}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onOrder}>
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
                padding: 40,
                borderRadius: 120,
                backgroundColor: appColors.primary,
                marginBottom: 20,
              }}>
              <FontAwesome5
                name="shopping-cart"
                size={80}
                color={appColors.white}
              />
            </View>
            <TextComponent text="Đặt hàng thành công" size={22} title />
          </View>
          <TouchableOpacity
            style={[styles.Button, styles.cancelButton]}
            onPress={onOrder}>
            <TextComponent text="Xem hóa đơn" size={18} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.Button} onPress={onShop}>
            <TextComponent text="Tiếp tục mua xắm" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OrderSuccess;

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
  },

  cancelButton: {
    backgroundColor: appColors.grayLight,
  },
  Button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: appColors.primary,
    borderRadius: 60,
    width: appInfo.sizes.WIDTH * 0.8,
    marginVertical: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
