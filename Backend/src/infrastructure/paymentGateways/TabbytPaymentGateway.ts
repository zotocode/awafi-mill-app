import Razorpay from 'razorpay';
import envConfig from "../../config/env"; // Make sure to have your keys in envConfig
import { IPaymentGateway } from './IPaymentGateway';
import { ShippingAddressDTO } from '../../domain/dtos/CheckoutDTO';
export class  TabbyPaymentGateway implements IPaymentGateway {
    // private stripe: Stripe;

    constructor() {
        // this.stripe = new Stripe(envConfig.STRIPE_SECRET_KEY as string);
    }

    async verifyPayment(clientSecret: string): Promise<boolean> {
        try {
            // const { paymentIntent } = await this.stripe.retrievePaymentIntent(clientSecret);
            // if (paymentIntent && paymentIntent.status === 'succeeded') {
            //     return true;
            // }
        } catch (error) {
            console.error('Error verifying payment:', error);
        }
        return false;
    }

}
