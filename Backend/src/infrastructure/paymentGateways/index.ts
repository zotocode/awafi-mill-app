// src/infrastructure/paymentGateways/index.ts
import { RazorpayGateway } from './RazorpayGateway';
import { StripeGateway } from './StripeGateway';

// Choose your payment gateway here
const paymentGateway = process.env.PAYMENT_GATEWAY === 'razorpay'
  ? new RazorpayGateway()
  : new StripeGateway();

export default paymentGateway;
