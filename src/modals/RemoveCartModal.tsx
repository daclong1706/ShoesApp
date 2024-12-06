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
import {fontFamilies} from '../constants/fontFamilies';

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
          <TextComponent
            text="Xóa khỏi cửa hàng?"
            title
            size={20}
            styles={{textAlign: 'center'}}
          />
          <SpaceComponent line color={appColors.primarySoft} />
          <View style={styles.modalContent}>
            <Image source={{uri: item.colorImage}} style={styles.modalImage} />
            <View style={styles.modalProductDetails}>
              <TextComponent
                text={item.name}
                size={18}
                font={fontFamilies.bold}
              />
              <TextComponent text={`Color: ${item.colorName}`} size={12} />
              <TextComponent text={`Size: ${item.selectedSize}`} size={12} />
              <RowComponent justify="space-between">
                <TextComponent
                  text={`${formatPrice(item.price)}`}
                  color={appColors.primary}
                  size={16}
                  font={fontFamilies.medium}
                />
                <TextComponent text={`Số lượng: ${item.quantity}`} />
              </RowComponent>
            </View>
          </View>
          <SpaceComponent line />
          {/* Nút Cancel và Yes, Remove */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.Button, styles.cancelButton]}
              onPress={onClose}>
              <TextComponent text="Hủy" size={16} font={fontFamilies.medium} />
            </TouchableOpacity>
            {/* <ButtonComponent
              type="primary"
              text="Cancel"
              onPress={onClose}
              color={appColors.coolGray}
            /> */}
            <TouchableOpacity style={styles.Button} onPress={onConfirm}>
              <TextComponent
                text="Xóa"
                color={appColors.white}
                size={16}
                font={fontFamilies.medium}
              />
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
    justifyContent: 'center',
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
