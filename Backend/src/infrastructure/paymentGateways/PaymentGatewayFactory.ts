import { RazorpayGateway } from './RazorpayGateway';
import { StripeGateway } from './StripeGateway';
import { IPaymentGateway } from './IPaymentGateway';

export class PaymentGatewayFactory {
  private static gateways: { [key: string]: IPaymentGateway } = {
    razorpay: new RazorpayGateway(),
    stripe: new StripeGateway(),
  };

  static getGateway(type: string): IPaymentGateway {
    const gateway = this.gateways[type.toLowerCase()];
    if (!gateway) {
      throw new Error(`Payment gateway ${type} not supported`);
    }
    return gateway;
  }
}