import { IPaymentGateway } from "./IPaymentGateway";

export class TabbyPaymentService implements IPaymentGateway {
  async createPaymentIntent(amount: number, currency: string) {
    return { clientSecret: "tabby-secret-key", paymentIntentId: "tabby_12345" };
  }

  async verifyPayment(paymentIntentId: string): Promise<{ success: boolean; message: string }> {
    return {success:true,message:"sdf"}; // Placeholder, implement real Tabby verification
  }
}
