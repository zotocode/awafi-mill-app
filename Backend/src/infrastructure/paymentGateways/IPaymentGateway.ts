// infrastructure/paymentGateways/IPaymentGateway.ts
// Interface for payment gateways
export interface IPaymentGateway {
  initiatePayment(paymentData:any): Promise<any>;
    // verifyPayment(paymentId: string, signature: string): Promise<boolean>;
  }
  

  export interface IPaymentGatewayResponse {
    success: boolean;
    data: any;
    gatewayReference?: string;
    error?: string;
  }