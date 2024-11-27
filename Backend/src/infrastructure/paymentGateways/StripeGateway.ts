import Stripe from 'stripe';
import envConfig from "../../config/env";
import { IPaymentGateway } from './IPaymentGateway';


export class StripePaymentGateway implements IPaymentGateway {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(envConfig.STRIPE_SECRET_KEY as string);
    }

    async verifyPayment(paymentIntentsId: string): Promise<any> {
        try {
            return await this.stripe.paymentIntents.retrieve(paymentIntentsId)
      
        } catch (error) {
            console.error('Error verifying payment:', error);
        }
        return {success:false,message:"There is not such payments"};
    }

    // ... rest of your code remains the same
}
