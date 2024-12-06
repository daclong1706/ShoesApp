import React, {ReactNode, useRef, useState} from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {Camera, Image, Link} from 'iconsax-react-native';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {appColors} from '../constants/appColor';
import ButtonComponent from './ButtonComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import {globalStyles} from '../styles/globalStyles';
import {appInfo} from '../constants/appInfos';
import InputComponent from './InputComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect to close modal when focus changes

interface Props {
  onSelect: (val: {type: 'url' | 'file'; value: string | ImageOrVideo}) => void;
}

const ImagePicker = ({onSelect}: Props) => {
  const modalizeRef = useRef<Modalize>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isVisibleModelAddUrl, setIsVisibleModelAddUrl] = useState(false);

  const choiceImages = [
    {
      key: 'camera',
      title: 'Chụp ảnh',
      icon: <Camera size={22} color={appColors.text} />,
    },
    {
      key: 'library',
      title: 'Chọn từ thư viện',
      icon: <Image size={22} color={appColors.text} />,
    },
    {
      key: 'url',
      title: 'Chọn từ URL',
      icon: <Link size={22} color={appColors.text} />,
    },
  ];

  // Handle open modal
  const handleOpenModal = () => modalizeRef.current?.open();

  // Render modal options
  const renderItem = (item: {icon: ReactNode; key: string; title: string}) => (
    <RowComponent
      key={item.key}
      styles={{marginBottom: 20}}
      onPress={() => handleChoiceImage(item.key)}>
      {item.icon}
      <SpaceComponent width={12} />
      <TextComponent text={item.title} flex={1} />
    </RowComponent>
  );

  // Handle image choice
  const handleChoiceImage = (key: string) => {
    switch (key) {
      case 'camera':
        ImageCropPicker.openCamera({
          width: 400,
          height: 400,
          cropping: true,
          mediaType: 'photo',
        })
          .then(res => onSelect({type: 'file', value: res}))
          .catch(() => {});
        break;
      case 'library':
        ImageCropPicker.openPicker({
          width: 400,
          height: 400,
          cropping: true,
          mediaType: 'photo',
        })
          .then(res => onSelect({type: 'file', value: res}))
          .catch(() => {});
        break;
      case 'url':
        setIsVisibleModelAddUrl(true);
        break;
      default:
        break;
    }
    modalizeRef.current?.close();
  };

  // Handle URL submission
  const handleUrlSubmit = () => {
    if (imageUrl) {
      onSelect({type: 'url', value: imageUrl});
      setIsVisibleModelAddUrl(false);
    }
  };

  // Close modal when focus changes (useFocusEffect)
  useFocusEffect(
    React.useCallback(() => {
      setIsVisibleModelAddUrl(false); // Close modal when screen loses focus
      return () => {
        setIsVisibleModelAddUrl(false); // Cleanup when screen gains focus again
      };
    }, []),
  );

  return (
    <View style={{position: 'absolute', bottom: -60}}>
      <TouchableOpacity
        onPress={handleOpenModal}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          paddingTop: 6,
          paddingLeft: 34,
          borderRadius: 44,
          width: 88,
          height: 88,
        }}>
        <FontAwesome name="camera" size={18} color={appColors.primary} />
      </TouchableOpacity>

      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          handlePosition="inside">
          <View style={{marginVertical: 30, paddingHorizontal: 20}}>
            {choiceImages.map(item => renderItem(item))}
          </View>
        </Modalize>
      </Portal>

      <Modal
        visible={isVisibleModelAddUrl}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisibleModelAddUrl(false)}>
        <View style={[globalStyles.container, styles.modalOverlay]}>
          <View style={styles.modalContent}>
            <TextComponent text="Nhập URL hình ảnh" color="#000" />
            <InputComponent
              value={imageUrl}
              onChange={setImageUrl}
              placeholder="https://example.com/image.jpg"
              allowClear
              affix={<Link size={22} color={appColors.darkGray} />}
            />
            <RowComponent justify="space-between" styles={{marginTop: 24}}>
              <ButtonComponent
                text="Hủy"
                type="primary"
                color={appColors.grayLight}
                textColor="#000"
                onPress={() => setIsVisibleModelAddUrl(false)}
                styles={{width: appInfo.sizes.WIDTH * 0.4}}
              />
              <ButtonComponent
                text="Xác nhận"
                type="primary"
                onPress={handleUrlSubmit}
                styles={{width: appInfo.sizes.WIDTH * 0.4}}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalContent: {
    width: '92%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
});
