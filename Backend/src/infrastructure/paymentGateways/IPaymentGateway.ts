// infrastructure/paymentGateways/IPaymentGateway.ts
// Interface for payment gateways
export interface IPaymentGateway {
    initiatePayment(amount: number, currency: string, UniqueId:any,otherOptions?:any): Promise<any>;
    verifyPayment(paymentId: string, signature: string): Promise<boolean>;
  }
  

  export interface IPaymentGatewayResponse {
    success: boolean;
    data: any;
    gatewayReference?: string;
    error?: string;
  }