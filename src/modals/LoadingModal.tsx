import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColor';

interface Props {
  visible: boolean;
  mess?: string;
}

const LoadingModal = (props: Props) => {
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
        <ActivityIndicator color={appColors.white} size={32} />
        <TextComponent text="Loading" color={appColors.white} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
