// infrastructure/paymentGateways/StripeGateway.ts
import Stripe from 'stripe';
import { IPaymentGateway } from './IPaymentGateway';
import envConfig from '../../config/env';

export class StripeGateway implements IPaymentGateway {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(envConfig.STRIPE_SECRET_KEY || '', {
        // @ts-ignore
      apiVersion: '2020-08-27',
    });
  }

  async initiatePayment(amount: number, currency: string, options?: any): Promise<any> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency,
      ...options,
    });
    return paymentIntent;
  }

  async verifyPayment(paymentId: string, signature: string): Promise<boolean> {
    // Verify the signature for a Stripe payment
    // You may want to add signature verification logic here
    return true; // For simplicity; implement actual logic as required
  }
}



// import Stripe from 'stripe';
// import { IPaymentGateway, IPaymentGatewayResponse } from './IPaymentGateway';

// export class StripeGateway implements IPaymentGateway {
//   private stripe: Stripe;

//   constructor() {
//     this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//       // @ts-ignore
//       apiVersion: '2020-08-27'
//     });
//   }

//   async initiatePayment(amount: number, currency: string, options?: any): Promise<IPaymentGatewayResponse> {
//     try {
//       const paymentIntent = await this.stripe.paymentIntents.create({
//         amount: amount * 100,
//         currency,
//         ...options
//       });

//       return {
//         success: true,
//         data: {
//           clientSecret: paymentIntent.client_secret,
//           amount: paymentIntent.amount,
//           currency: paymentIntent.currency,
//           publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
//         },
//         gatewayReference: paymentIntent.id
//       };
//     } catch (error) {
//       return {
//         success: false,
//         data: null,
//         error: error.message
//       };
//     }
//   }

//   async verifyPayment(paymentId: string, signature: string): Promise<boolean> {
//     // Implement Stripe signature verification
//     return true;
//   }
// }

