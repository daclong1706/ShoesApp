import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColor';

interface Props {
  mess?: string;
}

const Loading = (props: Props) => {
  const {mess} = props;
  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={appColors.white} size={32} />
        {mess && <TextComponent text={mess} color={appColors.white} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff', // Nền mờ
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Đảm bảo hiển thị ở trên các thành phần khác
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
