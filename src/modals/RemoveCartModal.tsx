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
import {ButtonComponent, RowComponent, SpaceComponent} from '../components';
import {appInfo} from '../constants/appInfos';

interface RemoveCartModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: {
    name: string;
    colorImage: string;
    selectedColor: string;
    selectedSize: string;
    colorName: string;
    price: number;
    quantity: number;
  };
}

const RemoveCartModal = ({
  visible,
  onClose,
  onConfirm,
  item,
}: RemoveCartModalProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Xóa khỏi cửa hàng?</Text>
          <SpaceComponent line />
          <View style={styles.modalContent}>
            <Image source={{uri: item.colorImage}} style={styles.modalImage} />
            <View style={styles.modalProductDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDetailsText}>
                Color: {item.colorName}
              </Text>
              <Text style={styles.productDetailsText}>
                Size: {item.selectedSize}
              </Text>
              <RowComponent justify="space-between">
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityText}>
                    Số lượng: {item.quantity}
                  </Text>
                </View>
              </RowComponent>
            </View>
          </View>
          <SpaceComponent line />
          {/* Nút Cancel và Yes, Remove */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.Button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
            {/* <ButtonComponent
              type="primary"
              text="Cancel"
              onPress={onClose}
              color={appColors.coolGray}
            /> */}
            <TouchableOpacity style={styles.Button} onPress={onConfirm}>
              <Text style={styles.removeText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RemoveCartModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
