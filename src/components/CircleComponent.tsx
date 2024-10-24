import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import React, {ReactNode} from 'react';
import {appColors} from '../constants/appColor';

interface Props {
  size?: number;
  children: ReactNode;
  color?: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const CircleComponent = (props: Props) => {
  const {size, color, onPress, children, styles} = props;

  const localStyle = StyleSheet.create({
    container: {
      width: size ?? 40,
      height: size ?? 40,
      backgroundColor: color ?? appColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 6,
    },
  });

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={[localStyle.container, styles]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[localStyle.container, styles]}>{children}</View>
  );
};

export default CircleComponent;
