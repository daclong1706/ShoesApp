import React, {ReactNode} from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import TextComponent from './TextComponent';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  textFont?: string;
  onPress?: () => void;
  iconFlex?: 'right' | 'left';
  size?: number;
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    textColor,
    textStyles,
    textFont,
    color,
    styles,
    onPress,
    iconFlex,
    type,
    size,
  } = props;

  return type === 'primary' ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.button,
        globalStyles.shadow,
        {backgroundColor: color ?? appColors.primary},
        styles,
      ]}>
      {icon && iconFlex === 'left' && icon}
      <TextComponent
        text={text}
        color={textColor ?? appColors.white}
        styles={[textStyles, {marginLeft: icon ? 12 : 0, textAlign: 'center'}]}
        flex={icon && iconFlex === 'right' ? 1 : 0}
        font={textFont ?? fontFamilies.medium}
        size={size}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponent
        text={text}
        color={textColor ?? (type === 'link' ? appColors.link : appColors.text)}
        size={size}
        styles={[textStyles]}
      />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
