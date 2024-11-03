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

  async initiatePayment(
    amount: number,
    currency: string,
    stripeOptions?: { stripe_id: string },
    otherOptions?: { products: { name: string; variant: string; quantity: number }[], successUrl?: string, cancelUrl?: string }
  ): Promise<any> {
    try {
      const lineItems = otherOptions?.products.map((product) => ({
        price_data: {
          currency: currency || 'usd',
          product_data: {
            name: product.name,
            variant: product.variant,
            quantity:product.quantity
          },
          unit_amount: amount, // Amount per item; adjust this if each product has a different price
        },
        quantity: product.quantity,
      }));
  
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: otherOptions?.successUrl || 'https://localhost:3000/success',
        cancel_url: otherOptions?.cancelUrl || 'https://localhost:3000/cancel',
      });
  
      return {
        success: true,
        data: session,
        gatewayReference: session.id,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to create payment session',
      };
    }
  }

  async verifyPayment(paymentId: string, signature: string): Promise<boolean> {
    try {
      // Here you would implement Stripe's webhook signature verification
      // using stripe.webhooks.constructEvent()
      return true;
    } catch (error: any) {
      console.error('Payment verification failed:', error.message);
      return false;
    }
  }
}

