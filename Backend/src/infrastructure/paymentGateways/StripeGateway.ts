import Stripe from 'stripe';
import envConfig from "../../config/env"; // Ensure you have Stripe keys in envConfig
import { IPaymentGateway } from './IPaymentGateway';

export class StripePaymentGateway implements IPaymentGateway {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(envConfig.STRIPE_SECRET_KEY as string, {
            apiVersion: '2024-09-30.acacia',
        });
    }

    async initiatePayment(paymentData: any) {
        const { items, shippingAddress } = paymentData;

        // Calculate the total amount in cents for Stripe
        const totalAmount = items.reduce((total: number, item: any) => {
            return total + (item.inPrice * item.quantity * 100); // Convert to cents
        }, 0);

        // Create metadata with product details
        const productMetadata = items.map((item: any, index: number) => ({
            [`product_${index + 1}_name`]: `${item.name} - ${item.weight}`,
            [`product_${index + 1}_quantity`]: item.quantity,
            [`product_${index + 1}_inPrice`]: item.inPrice,
            [`product_${index + 1}_outPrice`]: item.outPrice,
        })).reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {}); // Flatten to a single object

        try {
            console.log("Initiating Stripe customer and ephemeral key creation...");

            // Create a Stripe customer
            const customer = await this.stripe.customers.create();
            console.log("Customer created successfully:", customer.id);

            // Create an ephemeral key for the customer
            const ephemeralKey = await this.stripe.ephemeralKeys.create(
                { customer: customer.id },
                { apiVersion: '2024-09-30.acacia' }
            );
            console.log("Ephemeral key created successfully:", ephemeralKey.id);

            // Create a PaymentIntent for the transaction
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: totalAmount,
                currency: 'usd',
                description: 'Order payment',
                metadata: {
                    ...productMetadata,
                    customerName: shippingAddress.fullName,
                    customerPhone: shippingAddress.phone,
                    shippingAddress: `${shippingAddress.addressLine1}, ${shippingAddress.addressLine2}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`
                },
                shipping: {
                    name: shippingAddress.fullName,
                    address: {
                        line1: shippingAddress.addressLine1,
                        line2: shippingAddress.addressLine2,
                        city: shippingAddress.city,
                        postal_code: shippingAddress.postalCode,
                        country: shippingAddress.country
                    },
                    phone: shippingAddress.phone
                },
            });
            console.log("Payment intent created successfully:", paymentIntent.id);

            // Return paymentIntent details, ephemeral key, and publishable key
            return {
                paymentIntent:paymentIntent.id,
                ephemeralKey:ephemeralKey.id,
                publishableKey: envConfig.STRIPE_PUBLIC_KEY,
                customer:customer.id
            };

        } catch (error: any) {
            console.error("Stripe payment initiation error:", error);
            
            // Handle Stripe-specific errors
            if (error instanceof Stripe.errors.StripeError) {
                throw new Error(`Stripe error: ${error.message}`);
            }

            // Handle network or unexpected errors
            throw new Error(`An unexpected error occurred during payment initiation: ${error.message}`);
        }
    }
}
