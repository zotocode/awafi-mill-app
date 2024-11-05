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
    otherOptions?: { products: { name: string; quantity: number }[], successUrl?: string, cancelUrl?: string }
  ): Promise<any> {
    console.log("initiate payment is working ");
    try {
      const lineItems = otherOptions?.products.map((product) => ({
        price_data: {
          currency: currency || 'usd',
          product_data: {
            name: product.name,
            // Remove the variant field as it's not supported
          },
          unit_amount: amount, // Amount per item; adjust this if each product has a different price
        },
        quantity: product.quantity, // Keep quantity here
      }));
  
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        shipping_address_collection:{
           allowed_countries:['IN','US','BR']
        },
        success_url: otherOptions?.successUrl || `${envConfig.Base_Url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: otherOptions?.cancelUrl || `${envConfig.Base_Url}/cancel`,
      });

      console.log("session data",session)
    
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

