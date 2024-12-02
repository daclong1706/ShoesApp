// InfoRow.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../../../constants/appColor';
import {RowComponent} from '../../../components';

type InfoRowProps = {
  icon: JSX.Element;
  value: string;
};

const InfoRow = ({icon, value}: InfoRowProps) => {
  return (
    <RowComponent justify="space-between" styles={{marginVertical: 6}}>
      <RowComponent>
        <View
          style={[
            styles.iconContainer,
            {borderWidth: 7, borderColor: '#DDDDDD'},
          ]}>
          {icon}
        </View>

        <Text style={styles.text}>{value}</Text>
      </RowComponent>
    </RowComponent>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: appColors.primary,
    padding: 5,
    width: 54,
    height: 54,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: appColors.primary,
    marginVertical: 4,
    marginLeft: 12,
  },
});

export default InfoRow;
