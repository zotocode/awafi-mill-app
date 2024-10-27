<<<<<<< HEAD
=======
// infrastructure/paymentGateways/IPaymentGateway.ts
>>>>>>> upstream/develop
// Interface for payment gateways
export interface IPaymentGateway {
    initiatePayment(amount: number, currency: string, options?: any): Promise<any>;
    verifyPayment(paymentId: string, signature: string): Promise<boolean>;
  }
<<<<<<< HEAD
  
=======
  

  export interface IPaymentGatewayResponse {
    success: boolean;
    data: any;
    gatewayReference?: string;
    error?: string;
  }
>>>>>>> upstream/develop
