// src/infrastructure/paymentGateways/index.ts
import envConfig from '../../config/env';
import { RazorpayGateway } from './RazorpayGateway';
import { StripeGateway } from './StripeGateway';

// Choose your payment gateway here
const paymentGateway = envConfig.PAYMENT_GATEWAY === 'razorpay'
  ? new RazorpayGateway()
  : new StripeGateway();

export default paymentGateway;
