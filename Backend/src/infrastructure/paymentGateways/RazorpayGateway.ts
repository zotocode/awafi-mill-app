<<<<<<< HEAD
=======
// infrastructure/paymentGateways/RazorpayGateway.ts
>>>>>>> upstream/develop
import Razorpay from 'razorpay';
import { IPaymentGateway } from './IPaymentGateway';

export class RazorpayGateway implements IPaymentGateway {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || ''
    });
  }

  async initiatePayment(amount: number, currency: string, options?: any): Promise<any> {
    const paymentOptions = {
      amount: amount * 100, // amount in paise
      currency,
      ...options
    };
    return this.razorpay.orders.create(paymentOptions);
  }

  async verifyPayment(paymentId: string, signature: string): Promise<boolean> {
    // Here we can implement signature verification logic
    return true; // For simplicity; implement actual logic as required
  }
}
<<<<<<< HEAD
=======



// // infrastructure/paymentGateways/RazorpayGateway.ts
// import Razorpay from 'razorpay';
// import { IPaymentGateway, IPaymentGatewayResponse } from './IPaymentGateway';

// export class RazorpayGateway implements IPaymentGateway {
//   private razorpay: Razorpay;

//   constructor() {
//     this.razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID || '',
//       key_secret: process.env.RAZORPAY_KEY_SECRET || ''
//     });
//   }

//   async initiatePayment(amount: number, currency: string, options?: any): Promise<IPaymentGatewayResponse> {
//     try {
//       const order = await this.razorpay.orders.create({
//         amount: amount * 100,
//         currency,
//         ...options
//       });

//       return {
//         success: true,
//         data: {
//           orderId: order.id,
//           amount: order.amount,
//           currency: order.currency,
//           keyId: process.env.RAZORPAY_KEY_ID
//         },
//         gatewayReference: order.id
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
//     // Implement Razorpay signature verification
//     return true;
//   }
// }
>>>>>>> upstream/develop
