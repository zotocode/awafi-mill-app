
import mongoose from "mongoose";
import { ShippingAddressDTO } from "../../domain/dtos/CheckoutDTO";
import { IProductDetails } from "../../domain/dtos/CartDTO";

// Interface for payment gateways
export interface IPaymentGateway {
  // initiatePayment(userId:mongoose.Types.ObjectId,shippingAddress:ShippingAddressDTO,items:IProductDetails[],currency:string): Promise<any>;
    verifyPayment(paymentIntentsId: string,): Promise<boolean>;
  }
  
