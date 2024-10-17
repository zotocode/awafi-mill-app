// Interface for payment gateways
export interface IPaymentGateway {
    initiatePayment(amount: number, currency: string, options?: any): Promise<any>;
    verifyPayment(paymentId: string, signature: string): Promise<boolean>;
  }
  