import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  title: string;
  size?: number;
  onPress?: () => void;
}

const TabBarComponent = (props: Props) => {
  const {title, size, onPress} = props;
  return (
    <View style={styles.header}>
      <TextComponent text={title} font={fontFamilies.medium} size={size} />
      <TouchableOpacity onPress={onPress}>
        <TextComponent
          text="See all"
          color={appColors.primary}
          font={fontFamilies.medium}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TabBarComponent;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: StatusBar.currentHeight,
  },
});
