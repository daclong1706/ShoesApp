import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SpaceComponent from './SpaceComponent';

const FooterComponent = () => {
  return (
    <View>
      <SpaceComponent line />
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 Đắc Long. All Rights Reserved.
        </Text>
      </View>
    </View>
  );
};

export default FooterComponent;

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#000',
    fontSize: 12,
  },
});
