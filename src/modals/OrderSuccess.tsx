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
            <TextComponent
              text="Đặt hàng thành công"
              size={22}
              styles={{fontWeight: 'bold'}}
            />
          </View>
          <TouchableOpacity
            style={[styles.Button, styles.cancelButton]}
            onPress={onOrder}>
            <Text style={styles.cancelText}>Xem hóa đơn</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Button} onPress={onShop}>
            <Text style={styles.removeText}>Tiếp tục mua xắm</Text>
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
    width: appInfo.sizes.WIDTH * 0.8,
    marginVertical: 10,
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
