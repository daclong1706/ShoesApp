import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {RowComponent, TextComponent} from '../components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {appColors} from '../constants/appColor';
import {appInfo} from '../constants/appInfos';

interface Props {
  visible: boolean;
  onClose: () => void;
  onCancel: () => void;
}

const OrderCancel = ({visible, onClose, onCancel}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
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
            <TextComponent
              text="Bạn muốn hủy đơn hàng"
              size={22}
              styles={{fontWeight: 'bold'}}
            />
          </View>
          <RowComponent justify="space-between">
            <TouchableOpacity
              style={[styles.Button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelText}>Đóng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button} onPress={onCancel}>
              <Text style={styles.removeText}>Hủy đơn hàng</Text>
            </TouchableOpacity>
          </RowComponent>
        </View>
      </View>
    </Modal>
  );
};

export default OrderCancel;

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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: appColors.black,
  },
  modalContent: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  modalProductDetails: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appColors.black,
    marginBottom: 6,
  },
  productDetailsText: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: appColors.black,
  },
  quantityContainer: {
    marginTop: 10,
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
  },
  cancelButton: {
    backgroundColor: appColors.grayLight,
  },
  Button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: appColors.primary,
    borderRadius: 60,
    width: appInfo.sizes.WIDTH * 0.4,
    marginVertical: 10,
    marginHorizontal: 5,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  removeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});
