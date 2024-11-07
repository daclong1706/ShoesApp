import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';

interface RemoveCartModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: {
    name: string;
    colorImage: string;
    selectedColor: string;
    selectedSize: string;
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
          <Text style={styles.modalTitle}>Remove From Cart?</Text>
          <View style={styles.modalContent}>
            <Image source={{uri: item.colorImage}} style={styles.modalImage} />
            <View style={styles.modalProductDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDetailsText}>
                Color: {item.selectedColor} | Size: {item.selectedSize}
              </Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityText}>
                  Quantity: {item.quantity}
                </Text>
              </View>
            </View>
          </View>

          {/* Nút Cancel và Yes, Remove */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton} onPress={onConfirm}>
              <Text style={styles.removeText}>Yes, Remove</Text>
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
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  modalProductDetails: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDetailsText: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  removeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff6666',
    borderRadius: 10,
  },
  cancelText: {
    color: '#333',
  },
  removeText: {
    color: '#fff',
  },
});
