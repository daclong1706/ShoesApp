import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import paypalAPI from '../../apis/paypalAPI';
import {appInfo} from '../../constants/appInfos';
import ContainerCart from './components/ContainerCart';
import getExchangeRate from '../../apis/exchangeRateAPI';
import {fontFamilies} from '../../constants/fontFamilies';

const PaypalScreen = ({navigation, route}: any) => {
  const {pay} = route.params;
  const [orderID, setOrderID] = useState<string | null>(null);
  const [approvalUrl, setApprovalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Tạo đơn hàng PayPal
  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      // Lấy tỷ giá USD/VND hiện tại
      const exchangeRate = await getExchangeRate();

      // Chuyển đổi từ VND sang USD
      const amountInUSD = (pay / exchangeRate).toFixed(2);

      console.log(`Amount in USD: ${amountInUSD}`);

      const response = await paypalAPI.createOrder(amountInUSD); // Thanh toán 10 USD
      const approvalLink = response.links.find(
        link => link.rel === 'approve',
      )?.href;
      setOrderID(response.id);
      setApprovalUrl(approvalLink);
    } catch (error) {
      Alert.alert('Error', 'Failed to create PayPal order');
      console.error('Error creating PayPal order:', error);
    } finally {
      setLoading(false);
    }
  };

  // Xác nhận đơn hàng PayPal sau khi thanh toán
  const handleCaptureOrder = async (orderID: string) => {
    try {
      setLoading(true);
      const response = await paypalAPI.captureOrder(orderID);
      if (response.status === 'COMPLETED') {
        Alert.alert('Success', 'Payment captured successfully!');
      } else {
        Alert.alert('Error', 'Payment not completed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture payment');
      console.error('Error capturing PayPal order:', error);
    } finally {
      setLoading(false);
      setApprovalUrl(null); // Reset WebView
    }
  };

  // Xử lý WebView khi người dùng hoàn tất thanh toán
  const handleWebViewNavigation = async (event: any) => {
    if (event.url.includes('success') && orderID) {
      await handleCaptureOrder(orderID);
    }
  };

  // Tự động tạo đơn hàng khi màn hình được mở
  useEffect(() => {
    handleCreateOrder();
  }, []);

  return (
    <ContainerCart isButton title="PayPal">
      {approvalUrl ? (
        <WebView
          source={{
            uri: approvalUrl,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          mixedContentMode="always" // Cho phép nội dung hỗn hợp
          javaScriptCanOpenWindowsAutomatically={true} // Cho phép mở cửa sổ mới
          originWhitelist={['*']}
          cacheEnabled={false}
          style={{flex: 1, width: appInfo.sizes.WIDTH}}
          injectedJavaScript={`
            const style = document.createElement('style');
            style.innerHTML = 'body { font-family: "${fontFamilies.regular}"; }';
            document.head.appendChild(style);
          `}
          onNavigationStateChange={handleWebViewNavigation}
          onShouldStartLoadWithRequest={event => {
            console.log('Navigating to:', event.url);
            return true;
          }}
        />
      ) : (
        <View />
      )}
    </ContainerCart>
  );
};

export default PaypalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
