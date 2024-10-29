import {
  View,
  Text,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {appInfo} from '../constants/appInfos';

interface Props {
  onPress?: () => void;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const ShoesCard = (props: Props) => {
  const {children, styles, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[globalStyles.card, globalStyles.shadow, {}, styles]}>
      {children}
    </TouchableOpacity>
  );
};

export default ShoesCard;

const localStyle = StyleSheet.create({
  shoeCard: {
    width: appInfo.sizes.WIDTH * 0.5,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginRight: 10,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
});
