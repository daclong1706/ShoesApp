import stripeAxiosClient from './stripeAxiosClient';

class StripeAPI {
  // Tạo Payment Intent cho thẻ tín dụng
  async createPaymentIntent(amount: string): Promise<{clientSecret: string}> {
    const response = await stripeAxiosClient.post(
      '/stripe/create-payment-intent',
      {
        amount,
      },
    );
    return response.data;
  }

  // Xác nhận thanh toán thẻ tín dụng (nếu cần, nhưng với Stripe React Native SDK, bạn sẽ làm điều này trên client)
  async confirmPayment(
    clientSecret: string,
    paymentMethodId: string,
  ): Promise<{status: string}> {
    const response = await stripeAxiosClient.post('/stripe/confirm-payment', {
      clientSecret,
      paymentMethodId,
    });
    return response.data;
  }

  // Hoàn tiền cho một thanh toán (nếu cần)
  async refundPayment(
    paymentIntentId: string,
  ): Promise<{status: string; message: string}> {
    const response = await stripeAxiosClient.post('/stripe/refund-payment', {
      paymentIntentId,
    });
    return response.data;
  }

  async createPaymentMethod(cardData: {
    cardNumber: string;
    expMonth: number;
    expYear: number;
    cvc: string;
    cardholderName: string;
  }): Promise<{paymentMethod: object}> {
    const response = await stripeAxiosClient.post(
      '/stripe/create-payment-method',
      cardData,
    );
    return response.data;
  }
}

const stripeAPI = new StripeAPI();
export default stripeAPI;
