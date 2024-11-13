import Razorpay from 'razorpay';
import envConfig from "../../config/env"; // Make sure to have your keys in envConfig
import { IPaymentGateway } from './IPaymentGateway';
export class RazorpayPaymentGateway implements IPaymentGateway {
    private razorpay: Razorpay;

    constructor() {
        this.razorpay = new Razorpay({
            key_id: envConfig.RAZORPAY_KEY_ID as string,
            key_secret: envConfig.RAZORPAY_SECRET_KEY as string,
        });
    }

    async initiatePayment(paymentData:any) {
        console.log("razorpay is intiating")
        try {
            const options = {
                amount: 30 * 100, // Razorpay works with paise (1 INR = 100 paise)
                currency: 'usd',
                receipt: "description", // Optional: You can also use order ID or custom receipt
                payment_capture: 1, // 1 means automatic capture
            };

            const order = await this.razorpay.orders.create(options);
            return order;
        } catch (error) {
            throw new Error('Razorpay payment initiation failed: ' + error.message);
        }
    }
}
