import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {appColors} from '../constants/appColor';

interface Props {
  width?: number;
  height?: number;
  line?: boolean;
}

const SpaceComponent = (props: Props) => {
  const {width, height, line} = props;

  return line ? (
    <View
      style={{
        height: 1,
        backgroundColor: appColors.grayLight,
        marginVertical: 8,
      }}
    />
  ) : (
    <View
      style={{
        width,
        height,
      }}
    />
  );
};

export default SpaceComponent;
