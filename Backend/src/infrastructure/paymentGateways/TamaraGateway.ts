import Stripe from 'stripe';
import envConfig from "../../config/env";
import { IPaymentGateway } from './IPaymentGateway';
import { ShippingAddressDTO } from '../../domain/dtos/CheckoutDTO';
import mongoose from 'mongoose';
import { IProductDetails } from '../../domain/dtos/CartDTO';

export class TamaraPaymentGateway implements IPaymentGateway {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(envConfig.STRIPE_SECRET_KEY as string);
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
