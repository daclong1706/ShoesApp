import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CreditCard = ({cardNumber, expiryDate}: any) => {
  return (
    <LinearGradient
      colors={['#6E00FF', '#9B00FF']}
      style={styles.cardContainer}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.topRow}>
        <Text style={styles.balanceLabel}>Credit Card</Text>
        <Image
          source={require('../../../assets/images/dark-phone.jpg')}
          style={styles.logo}
        />
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
        <Text style={styles.expiryDate}>{expiryDate}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    height: 180,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceLabel: {
    color: '#FFF',
    fontSize: 16,
    opacity: 0.7,
  },
  cardDetails: {
    marginTop: 20,
  },
  cardNumber: {
    color: '#FFF',
    fontSize: 18,
    letterSpacing: 3,
  },
  expiryDate: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'right',
  },
  logo: {
    width: 50,
    height: 30,
  },
});

export default CreditCard;

//source={require('../../../assets/images/dark-phone.jpg')}
