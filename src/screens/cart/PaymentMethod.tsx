import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ContainerCart from './components/ContainerCart';
import {RowComponent, TextComponent} from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Pro';
import {appColors} from '../../constants/appColor';
import getExchangeRate from '../../apis/exchangeRateAPI';
import {fontFamilies} from '../../constants/fontFamilies';

const paymentMethods = [
  {
    id: 'wallet',
    name: 'My Wallet',
    balance: '$9,379',
    icon: 'wallet',
    iconType: 'FontAwesome5',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'paypal',
    iconType: 'FontAwesome',
  },
  {
    id: 'mastercard',
    name: 'Thẻ tín dụng',
    icon: 'cc-mastercard',
    iconType: 'FontAwesome',
  },
  {
    id: 'cash',
    name: 'Tiền mặt',
    icon: 'money-bill-alt',
    iconType: 'FontAwesome5',
  },
];

const PaymentMethod = ({navigation, route}: any) => {
  const {pay, shipping, address} = route.params;
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedMethod(id);
  };

  const handleConfirmPayment = () => {
    if (selectedMethod === 'paypal') {
      navigation.navigate('PaypalScreen', {pay, shipping, address});
    } else if (selectedMethod === 'mastercard') {
      navigation.navigate('MasterCardScreen', {pay, shipping, address});
    } else if (selectedMethod === 'cash') {
      navigation.navigate('CashScreen', {pay, shipping, address});
    } else {
      Alert.alert('Phương thức thanh toán chưa được hỗ trợ.');
    }
  };

  const renderIcon = (icon: string, iconType: string, isSelected: boolean) => {
    const iconColor = appColors.primary;
    const iconSize = 24;

    switch (iconType) {
      case 'FontAwesome5':
        return <FontAwesome5 name={icon} size={iconSize} color={iconColor} />;
      case 'FontAwesome':
        return <FontAwesome name={icon} size={iconSize} color={iconColor} />;
      case 'FontAwesome5Brands':
      default:
        return (
          <FontAwesome5Brands name={icon} size={iconSize} color={iconColor} />
        );
    }
  };

  const renderItem = ({item}: any) => {
    const isSelected = selectedMethod === item.id;

    return (
      <TouchableOpacity
        style={[styles.paymentOption, isSelected && styles.selectedOption]}
        onPress={() => handleSelect(item.id)}>
        <View style={styles.iconContainer}>
          {renderIcon(item.icon, item.iconType, isSelected)}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.paymentText, isSelected && styles.selectedText]}>
            {item.name}
          </Text>
          {item.balance && (
            <Text style={styles.balanceText}>{item.balance}</Text>
          )}
        </View>
        <View style={styles.radioButton}>
          {isSelected && <View style={styles.radioSelected} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ContainerCart
      title="Phương thức thanh toán"
      buttonText="Xác nhận thanh toán"
      onPress={handleConfirmPayment}>
      <View style={{padding: 25}}>
        <TextComponent
          text="Chọn phương thức thanh toán bạn muốn sử dụng"
          styles={{marginBottom: 12, textAlign: 'center'}}
        />
        <FlatList
          data={paymentMethods}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </ContainerCart>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    borderColor: appColors.primary,
    backgroundColor: '#f0f8ff',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  paymentText: {
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    color: '#333',
  },
  selectedText: {
    color: appColors.primary,
    fontFamily: fontFamilies.bold,
  },
  balanceText: {
    fontSize: 14,
    color: '#888',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: appColors.primary,
  },
});
