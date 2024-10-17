import Stripe from 'stripe';
import { IPaymentGateway } from './IPaymentGateway';

export class StripeGateway implements IPaymentGateway {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
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
