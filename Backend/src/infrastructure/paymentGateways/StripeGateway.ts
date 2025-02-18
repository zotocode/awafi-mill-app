import Stripe from 'stripe';
import envConfig from "../../config/env";
import { IPaymentGateway } from './IPaymentGateway';


export class StripePaymentGateway implements IPaymentGateway {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(envConfig.STRIPE_SECRET_KEY as string);
    }


      async createPaymentIntent(amount: number, currency: string) {
        try {
          const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency,
            payment_method_types: ["card"],
          });
    
          return {
            clientSecret: paymentIntent.client_secret!,
            paymentIntentId: paymentIntent.id,
          };
        } catch (error) {
          throw new Error("Failed to create Stripe payment intent");
        }
      }
      async verifyPayment(paymentIntentId: string): Promise<{ success: boolean; message: string }> {
        try {
          const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
            
          if (paymentIntent.status === "succeeded") {
            return { success: true, message: "Payment successful" };
          } else {
            return { success: false, message: `Payment status: ${paymentIntent.status}` };
          }
        } catch (error: any) {
      
          // Handle specific Stripe errors
          if (error.type === "StripeInvalidRequestError") {
            return { success: false, message: "Invalid PaymentIntent ID or request" };
          } else if (error.type === "StripeAPIError") {
            return { success: false, message: "Stripe API error, please try again later" };
          }
      
          // Generic error fallback
          return { success: false, message: "An unexpected error occurred while verifying payment" };
        }
      }
      
}
