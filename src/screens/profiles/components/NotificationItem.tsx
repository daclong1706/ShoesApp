import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColor';
import {fontFamilies} from '../../../constants/fontFamilies';

interface NotificationItemProps {
  label: string;
  value: boolean;
  onToggle: () => void;
}

const NotificationItem = ({label, value, onToggle}: NotificationItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        thumbColor={value ? appColors.whiteLight : appColors.whiteLight}
        trackColor={{false: appColors.primary, true: appColors.primary}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontFamily: fontFamilies.regular,
  },
});

export default NotificationItem;
