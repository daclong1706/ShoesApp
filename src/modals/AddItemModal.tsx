import {View, Text, Modal} from 'react-native';
import React from 'react';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColor';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  visible: boolean;
  mess?: string;
}

const AddItemModal = (props: Props) => {
  const {visible, mess} = props;
  return (
    <Modal visible={visible} style={{flex: 1}} transparent statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AntDesign name="checkcircle" color={appColors.success} size={48} />
        <TextComponent
          text="Đã thêm sản phẩm vào giỏ hàng"
          color={appColors.white}
          styles={{marginTop: 24}}
          size={16}
        />
      </View>
    </Modal>
  );
};

export default AddItemModal;
