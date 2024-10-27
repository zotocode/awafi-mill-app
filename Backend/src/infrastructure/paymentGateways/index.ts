// src/infrastructure/paymentGateways/index.ts
<<<<<<< HEAD
=======
import envConfig from '../../config/env';
>>>>>>> upstream/develop
import { RazorpayGateway } from './RazorpayGateway';
import { StripeGateway } from './StripeGateway';

// Choose your payment gateway here
<<<<<<< HEAD
const paymentGateway = process.env.PAYMENT_GATEWAY === 'razorpay'
=======
const paymentGateway = envConfig.PAYMENT_GATEWAY === 'razorpay'
>>>>>>> upstream/develop
  ? new RazorpayGateway()
  : new StripeGateway();

export default paymentGateway;
